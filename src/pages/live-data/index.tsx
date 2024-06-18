import { Outlet } from 'react-router-dom';
import MainWrapper from '../../components/MainWrapper';
import { SidebarLinks } from '../../types';

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

export default function LiveDataPage({ }: Props) {
  return (
    <MainWrapper links={links}>
      <Outlet />
    </MainWrapper>
  )
}