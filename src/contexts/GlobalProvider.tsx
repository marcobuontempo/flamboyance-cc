import { ReactNode } from 'react'
import UserSessionProvider from './UserSessionContext';

type Props = {
  children: ReactNode;
}

export default function GlobalProvider({ children }: Props) {
  return (
    <UserSessionProvider>
      {children}
    </UserSessionProvider>
  )
}