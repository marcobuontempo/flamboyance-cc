import Sidebar from "@/components/layout/Sidebar";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="min-w-full flex flex-nowrap justify-start items-start min-h-dvh font-montserrat tracking-wider p-8 bg-black-primary text-white/80 cursor-default overflow-visible">
      <Sidebar />
      <Outlet />
    </div>
  )
}