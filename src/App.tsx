import { Outlet } from "react-router-dom"

function App() {
  return (
    <>
      <header>
        <nav className='bg-blue-300'>Navbar</nav>
      </header>

      <main className='flex flex-wrap justify-center items-stretch flex-1 bg-blue-100'>
        <Outlet />
      </main>

      <footer className='bg-blue-900'>Footer</footer>
    </>
  )
}

export default App
