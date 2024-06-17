import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider, } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import WalletPage from './pages/WalletPage.tsx';
import LiveDataPage from './pages/LiveDataPage.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import AnalyticsPage from './pages/AnalyticsPage.tsx';
import SettingsPage from './pages/SettingsPage.tsx';

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
