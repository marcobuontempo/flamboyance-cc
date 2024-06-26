import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react'

type Props = {
  children: ReactNode;
}

type WalletType = {
  current: string | null;
  stored: Array<string>;
}

type WalletContextType =
  WalletType &
  {
    setWallet: Dispatch<SetStateAction<WalletType>>;
  }


const defaultWallet: WalletType = {
  current: null,
  stored: [],
}


export const WalletContext = createContext<WalletContextType | undefined>(undefined);

export default function WalletProvider({ children }: Props) {
  const [wallet, setWallet] = useState<WalletType>(defaultWallet);

  return (
    <WalletContext.Provider value={{ ...wallet, setWallet }}>
      {children}
    </WalletContext.Provider>
  )
}