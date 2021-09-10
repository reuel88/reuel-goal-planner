import React, { createContext, useContext, useEffect, useState, FunctionComponent } from "react";
import authService from "@services/authService";

export interface UserContent {
  uid: string,
  email: string
}

export interface AuthContent {
  currentUser: UserContent | null,
  signUp: (email: string, password: string) => Promise<any>,
  signIn: (email: string, password: string) => Promise<any>,
  signOut: () => Promise<any>,
  resetPassword: (email: string) => Promise<any>,
  updateEmail: (email: string) => Promise<any>,
  updatePassword: (password: string) => Promise<any>,
}

const AuthContext = createContext<AuthContent | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: FunctionComponent = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function signUp(email: string, password: string) {
    return authService.signUp(email, password);
  }

  function signIn(email: string, password: string) {
    return authService.signIn(email, password);
  }

  function signOut() {
    return authService.signOut();
  }

  function resetPassword(email: string) {
    return authService.resetPassword(email);
  }

  function updateEmail(email: string) {
    return authService.updateEmail(email);
  }

  function updatePassword(password: string) {
    return authService.updatePassword(password);
  }

  useEffect(() => {
    return authService.authListener((user: any) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  const value: AuthContent = {
    currentUser,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateEmail,
    updatePassword
  };

  return (<AuthContext.Provider value={value}>
    {loading && <div>...loading</div>}
    {!loading && children}
  </AuthContext.Provider>);
};