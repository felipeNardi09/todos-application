import { type UserI } from "@/interfaces/UserI";
import { createContext, type ReactNode, useContext } from "react";

interface ContextI {
  children: ReactNode;
  value?: UserI;
}

const AuthContext = createContext<UserI | undefined>(undefined);

export function AuthProvider({ children, value }: ContextI) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthValue() {
  return useContext(AuthContext);
}
