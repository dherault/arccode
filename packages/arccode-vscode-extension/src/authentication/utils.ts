import * as vscode from 'vscode'

import type { PromiseAdapter } from '../types'

const passthrough = (value: any, resolve: (value?: any) => void) => resolve(value)

/**
 * Return a promise that resolves with the next emitted event, or with some future
 * event as decided by an adapter.
 *
 * If specified, the adapter is a function that will be called with
 * `(event, resolve, reject)`. It will be called once per event until it resolves or
 * rejects.
 *
 * The default adapter is the passthrough function `(value, resolve) => resolve(value)`.
 *
 * @param event the event
 * @param adapter controls resolution of the returned promise
 * @returns a promise that resolves or rejects as specified by the adapter
 */
export function promiseFromEvent<T, U>(
  event: vscode.Event<T>,
  adapter: PromiseAdapter<T, U> = passthrough
): {
  promise: Promise<U>
  cancel: vscode.EventEmitter<void>
} {
  let subscription: vscode.Disposable
  const cancel = new vscode.EventEmitter<void>()

  return {
    promise: new Promise<U>((resolve, reject) => {
      cancel.event(() => reject(new Error('Cancelled')))
      subscription = event((value: T) => {
        try {
          Promise
            .resolve(adapter(value, resolve, reject))
            .catch(reject)
        }
        catch (error) {
          reject(error)
        }
      })
    }).then(
      (result: U) => {
        subscription.dispose()

        return result
      },
      error => {
        subscription.dispose()
        throw error
      }
    ),
    cancel,
  }
}
