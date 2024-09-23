"use client";

import { SessionProvider } from "next-auth/react";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  return <SessionProvider session={null}>{children}</SessionProvider>;
};

export default AuthProvider;
