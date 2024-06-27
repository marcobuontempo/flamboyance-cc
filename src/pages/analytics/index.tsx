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
    text: 'Total Value Locked',
    to: 'total-value-locked',
  },
  {
    text: 'F Token',
    to: 'f-token',
  },
  {
    text: 'Pools',
    to: 'pools',
  },
];

type Props = {}

export default function AnalyticsPage({ }: Props) {
  return (
    <MainWrapper navLinks={links}>
      AnalyticsPage
    </MainWrapper>
  )
}