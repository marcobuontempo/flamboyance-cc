import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ErrorPage from '../pages/error';
import HomePage from '../pages/home';
import WalletPage from '../pages/wallet';
import WalletClaims from '../pages/wallet/components/Claims';
import WalletLending from '../pages/wallet/components/Lending';
import WalletLiquidityPools from '../pages/wallet/components/LiquidityPools';
import WalletOverview from '../pages/wallet/components/Overview';
import WalletStaking from '../pages/wallet/components/Staking';
import WalletTrades from '../pages/wallet/components/Trades';
import WalletTransfers from '../pages/wallet/components/Transfers';
import LiveDataPage from '../pages/live-data';
import LiveDataOverview from '../pages/live-data/components/Overview';
import LiveDataClaims from '../pages/live-data/components/Claims';
import LiveDataTrades from '../pages/live-data/components/Trades';
import LiveDataLiquidityPools from '../pages/live-data/components/LiquidityPools';
import LiveDataStaking from '../pages/live-data/components/Staking';
import LiveDataLending from '../pages/live-data/components/Lending';
import LiveDataTransfers from '../pages/live-data/components/Transfers';
import AnalyticsPage from '../pages/analytics';
import AnalyticsOverview from '../pages/analytics/components/Overview';
import AnalyticsClaims from '../pages/analytics/components/Claims';
import AnalyticsTotalValueLocked from '../pages/analytics/components/TotalValueLocked';
import AnalyticsPools from '../pages/analytics/components/Pools';
import SettingsPage from '../pages/settings';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/wallet',
        element: <WalletPage />,
        children: [
          {
            path: '/wallet/overview',
            element: <WalletOverview />,
          },
          {
            path: '/wallet/claims',
            element: <WalletClaims />,
          },
          {
            path: '/wallet/trades',
            element: <WalletTrades />,
          },
          {
            path: '/wallet/liquidity-pools',
            element: <WalletLiquidityPools />,
          },
          {
            path: '/wallet/staking',
            element: <WalletStaking />,
          },
          {
            path: '/wallet/lending',
            element: <WalletLending />,
          },
          {
            path: '/wallet/transfers',
            element: <WalletTransfers />,
          },
        ],
      },
      {
        path: '/live-data',
        element: <LiveDataPage />,
        children: [
          {
            path: '/live-data/overview',
            element: <LiveDataOverview />,
          },
          {
            path: '/live-data/claims',
            element: <LiveDataClaims />,
          },
          {
            path: '/live-data/trades',
            element: <LiveDataTrades />,
          },
          {
            path: '/live-data/liquidity-pools',
            element: <LiveDataLiquidityPools />,
          },
          {
            path: '/live-data/staking',
            element: <LiveDataStaking />,
          },
          {
            path: '/live-data/lending',
            element: <LiveDataLending />,
          },
          {
            path: '/live-data/transfers',
            element: <LiveDataTransfers />,
          },
        ],
      },
      {
        path: '/analytics',
        element: <AnalyticsPage />,
        children: [
          {
            path: '/analytics/overview',
            element: <AnalyticsOverview />,
          },
          {
            path: '/analytics/claims',
            element: <AnalyticsClaims />,
          },
          {
            path: '/analytics/total-value-locked',
            element: <AnalyticsTotalValueLocked />,
          },
          {
            path: '/analytics/pools',
            element: <AnalyticsPools />,
          },
        ],
      },
      {
        path: '/settings',
        element: <SettingsPage />,
      },
    ],
  },
]);

export default router;