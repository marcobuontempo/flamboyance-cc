import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useContext, useEffect } from 'react';
import { getLocalStorageSettings } from './utils/helpers';
import apiClient from './services/api-client';
import { UserSessionContext } from './contexts/UserSessionContext';

function App() {
  const sessionContext = useContext(UserSessionContext);

  useEffect(() => {
    const loadUserSettings = async () => {
      const settings = getLocalStorageSettings();
      if (settings) {
        const exchangeRate = await apiClient.getFlamingoLivedataFiatexchangerate(`USD_${settings.currency}`);
        sessionContext?.setUserSession({
          ...sessionContext,
          ...settings,
          currency: settings.currency,
          exchangeRate,
        })
      }
    }
    loadUserSettings();
  }, [])

  return (
    <>
      <header>
        <Navbar />
      </header>
      <Outlet />
      <Footer />
    </>
  )
}

export default App
