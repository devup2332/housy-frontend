import { createSupabaseServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const PublicPage = async ({ children }: Props) => {
  const client = await createSupabaseServer();
  const { data } = await client.auth.getSession();
  if (data?.session) return redirect("/dashboard");
  return children;
};

export default PublicPage;
