import { type ReactNode } from "react";
import { ClerkProvider } from "@clerk/clerk-react";
import { environments } from "@/cofig/environments";

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  return (
    <ClerkProvider
      publishableKey={environments.CLERK_PUBLISHABLE_KEY}
      afterSignOutUrl="/login"
    >
      {children}
    </ClerkProvider>
  );
};

export default AuthProvider;
