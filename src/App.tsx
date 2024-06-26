import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GlobalProvider from './contexts/GlobalProvider';

function App() {
  return (
    <GlobalProvider>
      <header><Navbar /></header>
      <Outlet />
      <Footer />
    </GlobalProvider>
  )
}

export default App
