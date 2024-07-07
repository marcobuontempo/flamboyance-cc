import { Outlet, useSearchParams } from "react-router-dom";
import MainWrapper from "../../components/MainWrapper"
import { SidebarLinks } from "../../types";
import { MouseEvent, useContext, useEffect, useState } from "react";
import WalletSelector from "../../components/WalletSelector";
import { UserSessionContext } from "../../contexts/UserSessionContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";

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
  const sessionContext = useContext(UserSessionContext);
  const [address, setAddress] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const queryAddress = searchParams.get('address');
    if (queryAddress) {
      setAddress(queryAddress);
      sessionContext?.setUserSession({
        ...sessionContext,
        selectedWallet: queryAddress,
      })
    } else if (sessionContext?.selectedWallet) {
      setAddress(sessionContext.selectedWallet);
      searchParams.set('address', sessionContext.selectedWallet);
      setSearchParams(searchParams);
    }
  }, [searchParams])

  const handleChangeWallet = (e: MouseEvent<SVGElement>) => {
    e.preventDefault();
    searchParams.delete('address');
    setSearchParams(searchParams);
    sessionContext?.setUserSession({
      ...sessionContext,
      selectedWallet: null,
    })
    setAddress(null);
  }

  const sidebarHeader = (
    <div>
      <p className='flex-1 text-xs break-words text-center'><b>Address:</b> {address || 'none'}</p>
      {
        address &&
        <button className='w-full text-center hover:cursor-default'>
          <FontAwesomeIcon icon={faRotate} className='text-2xl p-2 sm:p-0 sm:text-base hover:cursor-pointer hover:scale-125' onClick={handleChangeWallet} />
        </button>
      }
    </div>
  );

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