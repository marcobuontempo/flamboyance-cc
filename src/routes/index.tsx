import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import ErrorPage from "@components/pages/Error";
import HomePage from "@components/pages/Home";
import LiveDataPage, { LiveDataOverview, LiveDataClaims } from "@components/pages/LiveData";
import AnalyticsPage from "@/components/pages/Analytics";
import WalletPage from "@components/pages/Wallet";
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
        ],
      },
      {
        path: '/analytics',
        element: <AnalyticsPage />,
      },
      {
        path: '/wallet',
        element: <WalletPage />,
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