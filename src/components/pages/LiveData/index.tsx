import MainWrapper from "@components/common/MainWrapper";
import { Outlet } from "react-router-dom";
import Overview from "./Overview";
import Claims from "./Claims";
import Lending from "./Lending";
import LiquidityPools from "./LiquidityPools";
import Staking from "./Staking";
import Trades from "./Trades";
import Transfers from "./Transfers";

export default function LiveDataPage() {
  return (
    <MainWrapper
      title='Live Data'
      baseURL='live-data'
      redirectURL='overview'
    >
      <Outlet />
    </MainWrapper>
  )
}

export {
  Overview as LiveDataOverview,
  Claims as LiveDataClaims,
  Lending as LiveDataLending,
  LiquidityPools as LiveDataLiquidityPools,
  Staking as LiveDataStaking,
  Trades as LiveDataTrades,
  Transfers as LiveDataTransfers,
};