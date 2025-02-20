import Sidebar from "@/components/layout/Sidebar";
import { Outlet } from "react-router-dom";
import useExchangeRate from "./hooks/useExchangeRate";
import MobileHeader from "./components/layout/MobileHeader";
import AnimatedCursor from "react-animated-cursor";

export default function App() {
  // call useExchangeRate to trigger the data fetching and caching
  useExchangeRate();

  return (
    <div className="min-w-full flex flex-nowrap justify-start items-start min-h-dvh font-montserrat tracking-wider px-3 pt-20 pb-20 md:p-8 bg-black-primary text-white/80 cursor-default overflow-visible">
      <AnimatedCursor 
        color="222, 73, 177"
        innerSize={12}
        outerScale={1.8}
        outerSize={30}
        trailingSpeed={10}
      />
      <MobileHeader />
      <Sidebar />
      <Outlet />
    </div>
  )
}