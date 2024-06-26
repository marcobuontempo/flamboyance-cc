import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react'

type Props = {
  children: ReactNode;
}

type UserSettingsType = {
  localCurrency: string;
};

type UserSettingsContextType =
  UserSettingsType &
  {
    setUserSettings: Dispatch<SetStateAction<UserSettingsType>>;
  }

const defaultUserSettings: UserSettingsType = {
  localCurrency: 'USD',
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