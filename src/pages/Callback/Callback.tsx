import { useClerk } from "@clerk/clerk-react";
import { Navigate } from "react-router";

const Callback = () => {
  const { handleRedirectCallback } = useClerk();
  handleRedirectCallback({
    signInFallbackRedirectUrl: "/dashboard",
  });

  return <Navigate to="/dashboard" />;
};

export default Callback;
