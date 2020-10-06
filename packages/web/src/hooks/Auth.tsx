import React, { createContext, useCallback, useContext, useState } from "react";
import api from "../services/api";

interface AuthState {
  token: string;
  user: object;
}

interface SingInCredentials {
  access: string;
  password: string;
}

interface AuthContextData {
  user: object;
  singIn(credentials: SingInCredentials): Promise<void>;
  singOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@ModeraVaca/token");
    const user = localStorage.getItem("@ModeraVaca/user");

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const singIn = useCallback(
    async ({ access, password }: SingInCredentials) => {
      const response = await api.post("auth/authenticate", {
        access,
        password,
      });

      localStorage.setItem("@ModeraVaca/token", response.data.token);
      localStorage.setItem(
        "@ModeraVaca/user",
        JSON.stringify(response.data.user)
      );

      setData({ token: response.data.token, user: response.data.user });
    },
    []
  );

  const singOut = useCallback(() => {
    localStorage.removeItem("@ModeraVaca/token");
    localStorage.removeItem("@ModeraVaca/user");

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, singIn, singOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
