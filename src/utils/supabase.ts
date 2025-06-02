import { environments } from "@/cofig/environments";
import { createClient, type Provider } from "@supabase/supabase-js";

export const supabase = createClient(
  environments.SUPABASE_PROJECT_URL,
  environments.SUPABASE_ANON_KEY,
);

const loginWithProvider = (provider: Provider, path?: string) => {
  const redirectTo = `${window.location.origin}${path ? path : "/dashboard"}`;
  return supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
    },
  });
};

export const loginWithGoogle = (path?: string) =>
  loginWithProvider("google", path);
