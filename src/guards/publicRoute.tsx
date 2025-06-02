import Loader from "@/components/UI/Loader";
import { supabase } from "@/utils/supabase";
import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";

type Props = {
  Component: React.FC;
};

const PublicRoute = ({ Component }: Props) => {
  const [loading, setLoading] = useState(true);
  const [currentSession, setCurrentSession] = useState<undefined | Session>();

  const init = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      setCurrentSession(session);
    }
    setLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  if (loading) return <Loader />;

  if (!currentSession) return <Component />;

  return <Navigate to="/dashboard" />;
};

export default PublicRoute;
