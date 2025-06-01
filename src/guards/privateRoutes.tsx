import Loader from "@/components/UI/Loader";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";

type Props = {
  Component: React.FC;
};

const PrivateRoute = ({ Component }: Props) => {
  const [loading, setLoading] = useState(true);
  const { isLoaded, isSignedIn } = useUser();
  console.log({
    isLoaded,
    loading,
    isSignedIn,
  });

  useEffect(() => {
    if (isLoaded) setLoading(false);
  }, [isLoaded, isSignedIn]);

  if (loading) return <Loader />;

  if (isSignedIn) return <Component />;

  return <Navigate to="/login" />;
};

export default PrivateRoute;
