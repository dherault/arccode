import ReactDOM from 'react-dom/client'
import LogRocket from 'logrocket'

import Router from '~router/Router'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router />
)

if (import.meta.env.PROD) {
  LogRocket.init('pspveg/arccodedev')
}
