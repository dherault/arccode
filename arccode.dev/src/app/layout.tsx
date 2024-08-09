import { type PropsWithChildren } from 'react'
import { Provider as WrapProvider } from 'react-wrap-balancer'

import { Toaster } from '~components/ui/Toaster'
import { TooltipProvider } from '~components/ui/Tooltip'
import ReferenceProvider from '~components/common/ReferenceProvider'
import VscodeExtensionAuthenticationProvider from '~components/authentication/VscodeExtensionAuthenticationProvider'
import AuthenticationProvider from '~components/authentication/AuthenticationProvider'

function RootLayout({ children }: PropsWithChildren) {
  return (
    <WrapProvider>
      <TooltipProvider>
        <ReferenceProvider>
          <AuthenticationProvider>
            <VscodeExtensionAuthenticationProvider>
              <div className="h-screen overflow-y-auto flex flex-col">
                {children}
              </div>
              <Toaster />
            </VscodeExtensionAuthenticationProvider>
          </AuthenticationProvider>
        </ReferenceProvider>
      </TooltipProvider>
    </WrapProvider>
  )
}

export default RootLayout
