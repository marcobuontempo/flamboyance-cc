import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider, } from 'react-router-dom';
import ErrorPage from './pages/error';
import HomePage from './pages/home';
import WalletPage from './pages/wallet';
import LiveDataPage from './pages/live';
import AnalyticsPage from './pages/analytics';
import SettingsPage from './pages/settings';
import Claims from './pages/live/components/Claims.tsx';
import Overview from './pages/live/components/Overview.tsx';
import Trades from './pages/live/components/Trades.tsx';
import LiquidityPools from './pages/live/components/LiquidityPools.tsx';
import Staking from './pages/live/components/Staking.tsx';
import Lending from './pages/live/components/Lending.tsx';
import Transfers from './pages/live/components/Transfers.tsx';

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
      },
      {
        path: '/live-data',
        element: <LiveDataPage />,
        children: [
          {
            path: '/live-data',
            element: <Overview />,
          },
          {
            path: '/live-data/claims',
            element: <Claims />,
          },
          {
            path: '/live-data/trades',
            element: <Trades />,
          },
          {
            path: '/live-data/liquidity-pools',
            element: <LiquidityPools />,
          },
          {
            path: '/live-data/staking',
            element: <Staking />,
          },
          {
            path: '/live-data/lending',
            element: <Lending />,
          },
          {
            path: '/live-data/transfers',
            element: <Transfers />,
          },
        ],
      },
      {
        path: '/analytics',
        element: <AnalyticsPage />,
      },
      {
        path: '/settings',
        element: <SettingsPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
