import Loader from "@/components/UI/Loader";
import { useSession } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";

type Props = {
  Component: React.FC;
};

const PublicRoute = ({ Component }: Props) => {
  const [loading, setLoading] = useState(true);
  const { isLoaded, session } = useSession();
  console.log({ isLoaded, session, loading });

  useEffect(() => {
    if (isLoaded) setLoading(false);
  }, [isLoaded]);

  if (loading) return <Loader />;

  if (!session) return <Component />;

  return <Navigate to="/dashboard" />;
};

export default PublicRoute;
