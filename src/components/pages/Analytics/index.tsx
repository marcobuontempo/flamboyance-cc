import MainWrapper from "@components/common/MainWrapper"
import { Outlet } from "react-router-dom"
import Claims from "./Claims"
import TotalValueLocked from "./TotalValueLocked"
import Pools from "./Pools"

export default function AnalyticsPage() {
  return (
    <MainWrapper
      title='Analytics'
      baseURL='analytics'
      redirectURL='claims'
    >
      <Outlet />
    </MainWrapper>
  )
}


export {
  Claims as AnalyticsClaims,
  TotalValueLocked as AnalyticsTotalValueLocked,
  Pools as AnalyticsPools,
}