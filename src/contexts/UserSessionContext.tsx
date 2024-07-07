import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'

type Props = {
  children: ReactNode;
}

export type UserSessionType = {
  selectedWallet: string | null;
  currency: string;
  exchangeRate: number;
};

type UserSessionContextType =
  UserSessionType &
  {
    setUserSession: Dispatch<SetStateAction<UserSessionType>>;
  }

export const defaultUserSessionValues: UserSessionType = {
  selectedWallet: null,
  currency: 'USD',
  exchangeRate: 1,
}

export const UserSessionContext = createContext<UserSessionContextType | undefined>(undefined);

export default function UserSessionProvider({ children }: Props) {
  const [session, setSession] = useState<UserSessionType>(defaultUserSessionValues);

  return (
    <UserSessionContext.Provider value={{ ...session, setUserSession: setSession }}>
      {children}
    </UserSessionContext.Provider>
  )
}