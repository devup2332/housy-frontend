import { useClerk } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Navigate } from "react-router";

const Callback = () => {
  const { handleRedirectCallback } = useClerk();
  useEffect(() => {
    handleRedirectCallback({
      signInFallbackRedirectUrl: "/dashboard",
      signInForceRedirectUrl: "/dashboard",
      signUpForceRedirectUrl: "/dashboard",
      signUpFallbackRedirectUrl: "/dashboard",
    });
  }, [handleRedirectCallback]);

  return <Navigate to="/dashboard" />;
};

export default Callback;
