import { type PropsWithChildren } from 'react'
import { Provider as WrapProvider } from 'react-wrap-balancer'

import { Toaster } from '~components/ui/Toaster'
import { TooltipProvider } from '~components/ui/Tooltip'
import AuthenticationProvider from '~components/authentication/AuthenticationProvider'

function RootLayout({ children }: PropsWithChildren) {
  return (
    <WrapProvider>
      <TooltipProvider>
        <AuthenticationProvider>
          <div className="h-screen overflow-y-auto flex flex-col">
            {children}
          </div>
        </AuthenticationProvider>
        <Toaster />
      </TooltipProvider>
    </WrapProvider>
  )
}

export default RootLayout
