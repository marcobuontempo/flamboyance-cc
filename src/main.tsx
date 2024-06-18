import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider, } from 'react-router-dom';
import ErrorPage from './pages/error';
import HomePage from './pages/home';
import WalletPage from './pages/wallet';
import LiveDataPage from './pages/live-data';
import AnalyticsPage from './pages/analytics';
import SettingsPage from './pages/settings';
import Claims from './pages/live-data/components/Claims.tsx';
import Overview from './pages/live-data/components/Overview.tsx';
import Trades from './pages/live-data/components/Trades.tsx';
import LiquidityPools from './pages/live-data/components/LiquidityPools.tsx';
import Staking from './pages/live-data/components/Staking.tsx';
import Lending from './pages/live-data/components/Lending.tsx';
import Transfers from './pages/live-data/components/Transfers.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
