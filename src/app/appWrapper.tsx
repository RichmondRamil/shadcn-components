'use client';
// DEPENDENCIES
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

interface IAppWrapperProps {
  children: ReactNode;
}

const AppWrapper = ({ children }: IAppWrapperProps) => (
  <SessionProvider>{children}</SessionProvider>
);

export default AppWrapper;
