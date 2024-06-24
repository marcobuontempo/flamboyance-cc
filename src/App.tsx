import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { createContext, useState } from 'react';

const defaultUserContext = {
  currentWallet: '',
  localCurrency: 'USD',
};

export const UserContext = createContext(defaultUserContext);

const placeholderAddress = 'NbQkpNXCAzUhjGgfP4yGXDFkXQaHCwH2Zx';

function App() {
  const [user, setUser] = useState({
    ...defaultUserContext,
    currentWallet: placeholderAddress,
  });

  return (
    <UserContext.Provider value={user}>
      <header><Navbar /></header>
      <Outlet />
      <Footer />
    </UserContext.Provider>
  )
}

export default App
