import { useState, useEffect, type ReactNode } from "react";
import * as userApi from "../api/userApi";
import type { User } from "../types/chat";
import { AuthContext } from "./AuthContextDef";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  // On first load, check if user is already logged in (cookie)
  useEffect(() => {
    userApi
      .getCurrentUser()
      .then((data) => {
        if (data?.success) {
          setUser(data.user);
          setIsAuthorized(true);
        }
      })
      .catch(() => {
        setUser(null);
        setIsAuthorized(false);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthorized, loading, setUser, setIsAuthorized }}
    >
      {children}
    </AuthContext.Provider>
  );
};
