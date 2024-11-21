import { useAppSelector } from "@hooks/useReduxHooks"
import MainWrapper from "@components/common/MainWrapper"
import { selectCurrentWalletAddress } from "@/redux/features/preferences/preferencesSlice"
import { Outlet } from "react-router-dom";
import WalletSelector from "@/components/common/WalletSelector";

export default function WalletPage() {
  const currentWalletAddress = useAppSelector(selectCurrentWalletAddress);

  return (
    <MainWrapper
      title='Wallet'
      baseURL='wallet'
    // redirectURL={currentWalletAddress ? 'overview' : undefined}
    >
      {
        currentWalletAddress
          ? <Outlet />
          : <WalletSelector />
      }
      <WalletSelector />
    </MainWrapper>
  )
}