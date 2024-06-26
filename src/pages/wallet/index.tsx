import { Outlet } from "react-router-dom";
import MainWrapper from "../../components/MainWrapper"
import { SidebarLinks } from "../../types";
import { useEffect } from "react";

const links: SidebarLinks = [
  {
    text: 'Overview',
    to: '',
  },
  {
    text: 'Claims',
    to: 'claims',
  },
  {
    text: 'Lending',
    to: 'lending',
  },
  {
    text: 'Liquidity Pools',
    to: 'liquidity-pools',
  },
  {
    text: 'Staking',
    to: 'staking',
  },
  {
    text: 'Trades',
    to: 'trades',
  },
  {
    text: 'Transfers',
    to: 'transfers',
  },
];

type Props = {}

export default function WalletPage({ }: Props) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryWallet = params.get('address');
    if (queryWallet) {
      // set query wallet address
    }
  }, [])

  return (
    <MainWrapper links={links}>
      <Outlet />
    </MainWrapper>
  )
}