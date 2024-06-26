import { ReactNode } from 'react'
import UserSettingsProvider from './UserSettingsContext';

type Props = {
  children: ReactNode;
}

export default function GlobalProvider({ children }: Props) {
  return (
    <UserSettingsProvider>
      {children}
    </UserSettingsProvider>
  )
}