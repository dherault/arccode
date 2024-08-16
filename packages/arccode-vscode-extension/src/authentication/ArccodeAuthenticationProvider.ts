// https://github.com/estruyf/vscode-auth-sample/blob/main/src/auth0AuthenticationProvider.ts

import {
  AuthenticationProvider,
  AuthenticationProviderAuthenticationSessionsChangeEvent,
  AuthenticationSession,
  Disposable,
  EventEmitter,
  ExtensionContext,
  ProgressLocation,
  Uri,
  authentication,
  env,
  window,
} from 'vscode'
import { v4 as uuid } from 'uuid'

import type {
  PromiseAdapter,
  UserInfo,
} from '../types'
import {
  AUTHENTICATION_NAME,
  AUTHENTICATION_TYPE,
  AUTHENTICATION_URL,
  CODE_EXCHANGE_PROMISE_KEY,
  SESSIONS_SECRET_KEY,
} from '../constants'

import UriEventHandler from './UriEventHandler'
import { promiseFromEvent } from './utils'

class ArccodeAuthenticationProvider implements AuthenticationProvider, Disposable {
  private _sessionChangeEmitter = new EventEmitter<AuthenticationProviderAuthenticationSessionsChangeEvent>()

  private _disposable: Disposable

  private _pendingStates: string[] = []

  private _codeExchangePromises = new Map<string, { promise: Promise<UserInfo>; cancel: EventEmitter<void> }>()

  private _uriHandler = new UriEventHandler()

  constructor(private readonly context: ExtensionContext) {
    this._disposable = Disposable.from(
      authentication.registerAuthenticationProvider(AUTHENTICATION_TYPE, AUTHENTICATION_NAME, this, { supportsMultipleAccounts: false }),
      window.registerUriHandler(this._uriHandler)
    )
  }

  get onDidChangeSessions() {
    return this._sessionChangeEmitter.event
  }

  get redirectUri() {
    const { publisher } = this.context.extension.packageJSON
    const { name } = this.context.extension.packageJSON

    return `${env.uriScheme}://${publisher}.${name}`
  }

   /**
   * Get the existing sessions
   */
  public async getSessions(): Promise<readonly AuthenticationSession[]> {
    const allSessions = await this.context.secrets.get(SESSIONS_SECRET_KEY)

    if (allSessions) {
      return JSON.parse(allSessions) as AuthenticationSession[]
    }

    return []
  }

  /**
   * Create a new auth session
   */
  public async createSession(): Promise<AuthenticationSession> {
    try {
      const userInfo = await this.login()

      if (!userInfo) {
        throw new Error('Arccode login failure')
      }

      const session: AuthenticationSession = {
        id: uuid(),
        accessToken: process.env.DEV ? userInfo.idToken : userInfo.refreshToken,
        account: {
          id: userInfo.userId,
          label: userInfo.userName,
        },
        scopes: [],
      }

      await this.context.secrets.store(SESSIONS_SECRET_KEY, JSON.stringify([session]))

      this._sessionChangeEmitter.fire({ added: [session], removed: [], changed: [] })

      return session
    }
    catch (error) {
      window.showErrorMessage(`Sign in failed: ${error}`)

      throw error
    }
  }

  /**
   * Remove an existing session
   * @param sessionId
   * @param accessToken
   */
  public async updateSession(sessionId: string, accessToken: string): Promise<void> {
    const sessions = await this.getSessions()

    const nextSessions = sessions.map(x => x.id === sessionId ? { ...x, accessToken } : x)

    await this.context.secrets.store(SESSIONS_SECRET_KEY, JSON.stringify(nextSessions))

    this._sessionChangeEmitter.fire({ added: [], removed: [], changed: nextSessions })
  }

  /**
   * Remove an existing session
   * @param sessionId
   */
  public async removeSession(sessionId: string): Promise<void> {
    const allSessions = await this.context.secrets.get(SESSIONS_SECRET_KEY)

    if (!allSessions) return

    const sessions = JSON.parse(allSessions) as AuthenticationSession[]
    const sessionIdx = sessions.findIndex(s => s.id === sessionId)
    const session = sessions[sessionIdx]
    sessions.splice(sessionIdx, 1)

    await this.context.secrets.store(SESSIONS_SECRET_KEY, JSON.stringify(sessions))

    if (session) {
      this._sessionChangeEmitter.fire({ added: [], removed: [session], changed: [] })
    }
  }

  /**
   * Dispose the registered services
   */
  public async dispose() {
    this._disposable.dispose()
  }

  /**
   * Log in to the frontend
   */
  private async login() {
    return window.withProgress<UserInfo>({
      location: ProgressLocation.Notification,
      title: 'Signing in to Arccode...',
      cancellable: true,
    }, async (_, token) => {
      const stateId = uuid()

      this._pendingStates.push(stateId)

      const searchParams = new URLSearchParams([
        ['redirect_uri', this.redirectUri],
        ['state', stateId],
      ])

      const uri = Uri.parse(`${AUTHENTICATION_URL}?${searchParams.toString()}`)

      await env.openExternal(uri)

      let codeExchangePromise = this._codeExchangePromises.get(CODE_EXCHANGE_PROMISE_KEY)

      if (!codeExchangePromise) {
        codeExchangePromise = promiseFromEvent(this._uriHandler.event, this.handleUri())

        this._codeExchangePromises.set(CODE_EXCHANGE_PROMISE_KEY, codeExchangePromise)
      }

      try {
        return await Promise.race([
          codeExchangePromise.promise,
          new Promise<string>((_, reject) => {
            setTimeout(() => reject(new Error('Cancelled')), 60000)
          }),
          promiseFromEvent<any, any>(token.onCancellationRequested, (_event, _adapter, reject) => {
            reject('User cancelled the sign in flow')
          }).promise,
        ])
      }
      finally {
        this._pendingStates = this._pendingStates.filter(n => n !== stateId)

        codeExchangePromise?.cancel.fire()

        this._codeExchangePromises.delete(CODE_EXCHANGE_PROMISE_KEY)
      }
    })
  }

  /**
   * Handle the redirect to VS Code (after sign in from Auth0)
   * @param scopes
   * @returns
   */
  private handleUri: () => PromiseAdapter<Uri, UserInfo> = () => async (uri, resolve, reject) => {
    const query = new URLSearchParams(uri.query)
    const idToken = query.get('id_token')
    const refreshToken = query.get('refresh_token')
    const state = query.get('state')
    const userId = query.get('user_id')
    const userName = query.get('user_name')

    if (!idToken) {
      reject(new Error('No id token'))

      return
    }

    if (!refreshToken) {
      reject(new Error('No refresh token'))

      return
    }

    if (!state) {
      reject(new Error('No state'))

      return
    }

    if (!userId) {
      reject(new Error('No user id'))

      return
    }

    if (!userName) {
      reject(new Error('No user name'))

      return
    }

    // Check if it is a valid auth request started by the extension
    if (!this._pendingStates.some(n => n === state)) {
      reject(new Error('State not found'))

      return
    }

    resolve({
      idToken,
      refreshToken,
      userId,
      userName,
    })
  }
}

export default ArccodeAuthenticationProvider
