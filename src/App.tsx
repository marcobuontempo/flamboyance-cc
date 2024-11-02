import Navbar from "@components/layout/Navbar";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="flex flex-nowrap justify-center items-start min-h-dvh font-montserrat tracking-wider p-8 bg-black-primary cursor-default">
      <Navbar />
      <Outlet />
    </div>
  )
}