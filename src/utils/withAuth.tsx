import { Navigate } from "react-router";
import { supabase } from "./supabase";

export const withAuth = async (Component: React.FC) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) return Component;
  return Navigate({ to: "/login" });
};
