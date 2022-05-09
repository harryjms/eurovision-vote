import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { JWTPayload } from "../helpers/jwt";

interface AuthContextProps {
  user: JWTPayload | null;
}
const AuthContext = createContext<AuthContextProps>({ user: null });
export const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthContextProps["user"]>(null);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/me");
      setUser(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
