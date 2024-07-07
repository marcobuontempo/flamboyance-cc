import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react'

type Props = {
  children: ReactNode;
}

export type UserSettingsType = {
  currency: string;
};

type UserSettingsContextType =
  UserSettingsType &
  {
    setUserSettings: Dispatch<SetStateAction<UserSettingsType>>;
  }

export const defaultUserSettings: UserSettingsType = {
  currency: 'USD',
}

export const UserSettingsContext = createContext<UserSettingsContextType | undefined>(undefined);

export default function UserSettingsProvider({ children }: Props) {
  const [userSettings, setUserSettings] = useState<UserSettingsType>(defaultUserSettings);

  return (
    <UserSettingsContext.Provider value={{ ...userSettings, setUserSettings }}>
      {children}
    </UserSettingsContext.Provider>
  )
}