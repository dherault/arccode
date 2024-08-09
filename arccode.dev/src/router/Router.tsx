// ! Do not edit this file directly, use npm run router instead
import { Suspense, lazy } from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'

import AppLayout from '~app/layout'
import App from '~app/page'

import NotFound from '~components/common/NotFound'
import CenteredSpinner from '~components/common/CenteredSpinner'

const AuthenticationSubRouter = lazy(() => import('~router/subRouters/AuthenticationSubRouter'))
const TildeSubRouter = lazy(() => import('~router/subRouters/TildeSubRouter'))
const SupportSubRouter = lazy(() => import('~router/subRouters/SupportSubRouter'))
const LegalSubRouter = lazy(() => import('~router/subRouters/LegalSubRouter'))

function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<CenteredSpinner />}>
        <Routes>
          <Route
            path="/"
            element={<AppLayout><Outlet /></AppLayout>}
          >
            <Route
              index
              element={<App />}
            />
            <Route
              path="authentication/*"
              element={<Suspense fallback={<CenteredSpinner />}><AuthenticationSubRouter /></Suspense>}
            />
            <Route
              path="~/*"
              element={<Suspense fallback={<CenteredSpinner />}><TildeSubRouter /></Suspense>}
            />
            <Route
              path="support/*"
              element={<Suspense fallback={<CenteredSpinner />}><SupportSubRouter /></Suspense>}
            />
            <Route
              path="legal/*"
              element={<Suspense fallback={<CenteredSpinner />}><LegalSubRouter /></Suspense>}
            />
            <Route
              path="*"
              element={<NotFound />}
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default Router
