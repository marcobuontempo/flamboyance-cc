import { Outlet } from 'react-router-dom';
import MainWrapper from '../../components/MainWrapper';
import { SidebarLinks } from '../../types';

type Props = {}

const links: SidebarLinks = [
  {
    text: 'Overview',
    to: '/live-data/overview',
  },
  {
    text: 'Claims',
    to: '/live-data/claims',
  },
  {
    text: 'Lending',
    to: '/live-data/lending',
  },
  {
    text: 'Liquidity Pools',
    to: '/live-data/liquidity-pools',
  },
  {
    text: 'Staking',
    to: '/live-data/staking',
  },
  {
    text: 'Trades',
    to: '/live-data/trades',
  },
  {
    text: 'Transfers',
    to: '/live-data/transfers',
  },
];

export default function LiveDataPage({ }: Props) {
  return (
    <MainWrapper navLinks={links} baseURL='live-data' redirectURL='overview'>
      <Outlet />
    </MainWrapper>
  )
}