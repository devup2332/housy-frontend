import { createBrowserRouter } from "react-router";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import App from "./App";
import Dashboard from "./pages/App/Dashboard/Dashboard";
import Properties from "./pages/App/Properties/Properties";
import Step1 from "./pages/Register/components/step1";
import Step2 from "./pages/Register/components/step2";
import Register from "./pages/Register/components/Register";
import PrivateRoute from "./guards/privateRoutes";
import PublicRoute from "./guards/publicRoute";
import Callback from "./pages/Callback/Callback";

export const router = createBrowserRouter(
  [
    {
      path: "/login",
      element: <PublicRoute Component={Login} />,
    },
    {
      path: "/sso-callback",
      element: <Callback />,
    },
    {
      path: "/register",
      element: <Register />,
      children: [
        {
          index: true,
          element: <PublicRoute Component={Step1} />,
        },
        {
          path: "fullName",
          element: <PrivateRoute Component={Step2} />,
        },
      ],
    },
    {
      path: "/forgotPassword",
      Component: ForgotPassword,
    },
    {
      path: "/",
      Component: App,
    },
    {
      path: "/dashboard",
      element: <PrivateRoute Component={Dashboard} />,
    },

    {
      path: "/properties",
      Component: Properties,
    },
  ],
  {
    basename: "/",
  },
);
