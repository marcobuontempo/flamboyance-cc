import { useAppSelector } from "@hooks/useReduxHooks"
import MainWrapper from "@components/common/MainWrapper"
import { selectCurrentWalletAddress } from "@/redux/features/preferences/preferencesSlice"
import { Outlet } from "react-router-dom";
import WalletSelector from "@/components/common/WalletSelector";
import Overview from "./Overview";
import Claims from "./Claims";
import Lending from "./Lending";
import LiquidityPools from "./LiquidityPools";
import Staking from "./Staking";
import Trades from "./Trades";
import Transfers from "./Transfers";

export default function WalletPage() {
  const currentWalletAddress = useAppSelector(selectCurrentWalletAddress);

  return (
    <MainWrapper
      title='Wallet'
      baseURL='wallet'
      redirectURL={currentWalletAddress ? 'overview' : undefined}
    >
      {
        currentWalletAddress
          ? <Outlet />
          : <WalletSelector />
      }
    </MainWrapper>
  )
}

export {
  Overview as WalletOverview,
  Claims as WalletClaims,
  Lending as WalletLending,
  LiquidityPools as WalletLiquidityPools,
  Staking as WalletStaking,
  Trades as WalletTrades,
  Transfers as WalletTransfers,
};