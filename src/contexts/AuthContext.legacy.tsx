import React, { createContext, useContext, useEffect, useState, FunctionComponent } from "react";
import authClientService from "@services/authClientService";

export interface UserContent {
  uid: string,
  email: string
}

export interface AuthContent {
  currentUser: UserContent | null,
}

const AuthContext = createContext<AuthContent | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: FunctionComponent = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return authClientService.authStateChanged((user: any) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  const value: AuthContent = {
    currentUser
  };

  return (<AuthContext.Provider value={value}>
    {loading && <div>...loading</div>}
    {!loading && children}
  </AuthContext.Provider>);
};