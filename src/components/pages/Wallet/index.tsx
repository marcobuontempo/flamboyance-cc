import { useAppDispatch, useAppSelector } from "@hooks/useReduxHooks"
import MainWrapper from "@components/common/MainWrapper"
import { selectCurrentWalletAddress, setCurrentWalletAddress } from "@/redux/features/preferences/preferencesSlice"
import { Outlet } from "react-router-dom";
import WalletSelector from "@/components/common/WalletSelector";
import Overview from "./Overview";
import Claims from "./Claims";
import Lending from "./Lending";
import LiquidityPools from "./LiquidityPools";
import Staking from "./Staking";
import Trades from "./Trades";
import Transfers from "./Transfers";
import LogoutIcon from "@assets/icons/logout.svg?react";

export default function WalletPage() {
  const dispatch = useAppDispatch();
  const currentWalletAddress = useAppSelector(selectCurrentWalletAddress);

  return (
    <MainWrapper
      title='Wallet'
      baseURL='wallet'
      redirectURL={currentWalletAddress ? 'overview' : undefined}
      className='relative'
    >
      {
        currentWalletAddress
          ? <>
            <button className='absolute top-0 right-0 pt-6 px-2' onClick={() => dispatch(setCurrentWalletAddress(''))}>
              <LogoutIcon className="text-pink-primary hover:text-white/80 h-6" />
            </button>
            <Outlet />
          </>
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