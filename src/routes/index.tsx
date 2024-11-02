import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import ErrorPage from "@components/pages/ErrorPage";
import HomePage from "@components/pages/HomePage";
import LiveDataPage from "@/components/pages/LiveDataPage";
import AnalyticsPage from "@/components/pages/AnalyticsPage";
import WalletPage from "@/components/pages/WalletPage";
import SettingsPage from "@/components/pages/SettingsPage";

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
        path: '/live-data',
        element: <LiveDataPage />,
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
]);

export default router;