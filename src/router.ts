import { createBrowserRouter } from "react-router";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/App/Dashboard/Dashboard";
import Properties from "./pages/App/Properties/Properties";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/forgotPassword",
    Component: ForgotPassword,
  },
  {
    path: "/app",
    children: [
      {
        path: "dashboard",
        Component: Dashboard,
      },
      {
        path: "properties",
        Component: Properties,
      },
    ],
  },
]);
