'use client'
// DEPENDENCIES
import { ReactNode } from 'react'
import { ConfigProvider } from 'antd'
import { SessionProvider } from 'next-auth/react'
// THEME
import theme from './theme'
interface IAppWrapperProps {
  children: ReactNode
}

const AppWrapper = ({ children }: IAppWrapperProps) => (
  <SessionProvider>
    <ConfigProvider theme={theme}>{children}</ConfigProvider>
  </SessionProvider>
)

export default AppWrapper
