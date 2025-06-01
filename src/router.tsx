import { createBrowserRouter } from "react-router";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import App from "./App";
import Dashboard from "./pages/App/Dashboard/Dashboard";
import Properties from "./pages/App/Properties/Properties";
import Step1 from "./pages/Register/components/step1";
import Step2 from "./pages/Register/components/step2";
import Step3 from "./pages/Register/components/step3";
import Register from "./pages/Register/components/Register";
import PrivateRoute from "./guards/privateRoutes";
import PublicRoute from "./guards/publicRoute";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

export const router = createBrowserRouter(
  [
    {
      path: "/login",
      element: <PublicRoute Component={Login} />,
    },
    {
      path: "/sso-callback",
      element: (
        <AuthenticateWithRedirectCallback signInFallbackRedirectUrl="/dashboard" />
      ),
    },
    {
      path: "/register",
      element: <PublicRoute Component={Register} />,
      children: [
        {
          index: true,
          Component: Step1,
        },
        {
          path: "step2",
          Component: Step2,
        },
        {
          path: "step3",
          Component: Step3,
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
