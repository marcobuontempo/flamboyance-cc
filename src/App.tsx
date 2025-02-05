import Sidebar from "@/components/layout/Sidebar";
import { Outlet } from "react-router-dom";
import useExchangeRate from "./hooks/useExchangeRate";
import MobileHeader from "./components/layout/MobileHeader";

export default function App() {
  // call useExchangeRate to trigger the data fetching and caching
  useExchangeRate();

  return (
    <div className="min-w-full flex flex-nowrap justify-start items-start min-h-dvh font-montserrat tracking-wider pt-20 pb-28 md:p-8 bg-black-primary text-white/80 cursor-default overflow-visible">
      <MobileHeader />
      <Sidebar />
      <Outlet />
    </div>
  )
}