import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

function App() {
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
