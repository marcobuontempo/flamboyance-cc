import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import ErrorPage from "@components/pages/Error";
import HomePage from "@components/pages/Home";
import LiveDataPage, { LiveDataOverview, LiveDataClaims, LiveDataLending, LiveDataLiquidityPools, LiveDataStaking, LiveDataTrades, LiveDataTransfers } from "@components/pages/LiveData";
import AnalyticsPage, { AnalyticsClaims, AnalyticsPools, AnalyticsTotalValueLocked } from "@/components/pages/Analytics";
import WalletPage, { WalletOverview } from "@components/pages/Wallet";
import SettingsPage from "@components/pages/Settings";

export const routes = [
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
            path: '/live-data/lending',
            element: <LiveDataLending />,
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
            path: '/live-data/trades',
            element: <LiveDataTrades />,
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
        ]
      },
      {
        path: '/wallet',
        element: <WalletPage />,
        children: [
          {
            path: '/wallet/overview',
            element: <WalletOverview />,
          },
          /* CURRENT ENDPOINTS NOT AVAILABLE */
          // {
          //   path: '/wallet/claims',
          //   element: <WalletClaims />,
          // },
          // {
          //   path: '/wallet/lending',
          //   element: <WalletLending />,
          // },
          // {
          //   path: '/wallet/liquidity-pools',
          //   element: <WalletLiquidityPools />,
          // },
          // {
          //   path: '/wallet/staking',
          //   element: <WalletStaking />,
          // },
          // {
          //   path: '/wallet/trades',
          //   element: <WalletTrades />,
          // },
          // {
          //   path: '/wallet/transfers',
          //   element: <WalletTransfers />,
          // },
        ],
      },
      {
        path: '/settings',
        element: <SettingsPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;