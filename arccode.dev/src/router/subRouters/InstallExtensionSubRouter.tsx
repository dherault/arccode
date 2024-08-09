// ! Do not edit this file directly, use npm run router instead
import { Outlet, Route, Routes } from 'react-router-dom'

import InstallExtension from '~app/install-extension.../page'

import NotFound from '~components/common/NotFound'

function InstallExtensionSubRouter() {
  return (
    <Routes>
      <Route
        path=""
        element={<Outlet />}
      >
        <Route
          index
          element={<InstallExtension />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Route>
    </Routes>
  )
}

export default InstallExtensionSubRouter
