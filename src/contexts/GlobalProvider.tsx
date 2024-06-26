import { ReactNode } from 'react'
import WalletProvider from './WalletContext';
import UserSettingsProvider from './UserSettingsContext';

type Props = {
  children: ReactNode;
}

export default function GlobalProvider({ children }: Props) {
  return (
    <UserSettingsProvider>
      <WalletProvider>
        {children}
      </WalletProvider>
    </UserSettingsProvider>
  )
}