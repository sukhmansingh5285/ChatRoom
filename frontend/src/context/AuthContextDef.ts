import { createContext } from "react";
import type { User } from "../types/chat";

export interface AuthContextType {
  user: User | null;
  isAuthorized: boolean;
  loading: boolean;
  setUser: (user: User | null) => void;
  setIsAuthorized: (val: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthorized: false,
  loading: true,
  setUser: () => {},
  setIsAuthorized: () => {},
});
