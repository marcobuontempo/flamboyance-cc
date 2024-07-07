import { Outlet, useSearchParams } from "react-router-dom";
import MainWrapper from "../../components/MainWrapper"
import { SidebarLinks } from "../../types";
import { useEffect, useState } from "react";
import WalletSelector from "../../components/WalletSelector";

const links: SidebarLinks = [
  {
    text: 'Overview',
    to: '/wallet/overview',
  },
  {
    text: 'Claims',
    to: '/wallet/claims',
  },
  {
    text: 'Lending',
    to: '/wallet/lending',
  },
  {
    text: 'Liquidity Pools',
    to: '/wallet/liquidity-pools',
  },
  {
    text: 'Staking',
    to: '/wallet/staking',
  },
  {
    text: 'Trades',
    to: '/wallet/trades',
  },
  {
    text: 'Transfers',
    to: '/wallet/transfers',
  },
];

export type WalletContextType = [string,];

type Props = {}

export default function WalletPage({ }: Props) {
  const [address, setAddress] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const queryAddress = searchParams.get('address');
    if (queryAddress) {
      setAddress(queryAddress);
    }
  }, [searchParams])

  const sidebarHeader = <>
    <p className='text-xs break-words'>Address: {address || 'none'}</p>
  </>

  return (
    <MainWrapper
      navHeader={sidebarHeader}
      navLinks={links}
      preserveParams={['address']}
      baseURL='wallet'
      redirectURL='overview'
    >
      {
        address ?
          <Outlet context={[address] as WalletContextType} /> :
          <WalletSelector />
      }
    </MainWrapper>
  )
}