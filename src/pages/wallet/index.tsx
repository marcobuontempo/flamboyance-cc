import { Outlet } from "react-router-dom";
import MainWrapper from "../../components/MainWrapper"
import { SidebarLinks } from "../../types";
import { useEffect, useState } from "react";

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

export type WalletContextType = [
  string,
]

type Props = {}

export default function WalletPage({ }: Props) {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryAddress = params.get('address');
    if (queryAddress) {
      setAddress(queryAddress);
    }
  }, [])

  return (
    <MainWrapper
      links={links}
      preserveParams={['address']}
    >
      {
        address ?
          <Outlet context={[address] as WalletContextType} /> :
          <p>No address. Please set address=</p>
      }
    </MainWrapper>
  )
}