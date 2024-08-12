import { Navigate } from 'react-router-dom'

function AdministratorRedirect() {
  return (
    <Navigate
      replace
      to="users"
    />
  )
}

export default AdministratorRedirect
