import { Outlet } from 'react-router-dom';
import MainWrapper from '../../components/MainWrapper';
import { SidebarLinks } from '../../types';

const links: SidebarLinks = [
  {
    text: 'Overview',
    to: '/analytics/overview',
  },
  {
    text: 'Claims',
    to: '/analytics/claims',
  },
  {
    text: 'Total Value Locked',
    to: '/analytics/total-value-locked',
  },
  {
    text: 'Pools',
    to: '/analytics/pools',
  },
];

type Props = {}

export default function AnalyticsPage({ }: Props) {
  return (
    <MainWrapper navLinks={links} baseURL='analytics' redirectURL='overview'>
      <Outlet />
    </MainWrapper>
  )
}