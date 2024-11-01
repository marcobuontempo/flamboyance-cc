import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import ErrorPage from "@components/pages/ErrorPage";
import HomePage from "@components/pages/HomePage";

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
    ],
  },
]);

export default router;