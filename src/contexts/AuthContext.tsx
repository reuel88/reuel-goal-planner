import React, { createContext, useContext, useEffect, useState, FunctionComponent } from "react";
import authService from "../services/authService";

export interface UserContent {
  uid: string,
  email: string
}

export interface AuthContent {
  currentUser: UserContent,
  signUp: (email: string, password: string) => Promise<any>,
  signIn: (email: string, password: string) => Promise<any>,
  signOut: () => Promise<any>,
  resetPassword: (email: string) => Promise<any>,
  updateEmail: (email: string) => Promise<any>,
  updatePassword: (password: string) => Promise<any>,
}

const AuthContext = createContext<AuthContent>({
  currentUser: {
    uid: "",
    email: ""
  },
  signUp: () => (new Promise((resolve, reject) => reject("Failed to register"))),
  signIn: () => (new Promise((resolve, reject) => reject("Failed to sign in"))),
  signOut: () => (new Promise((resolve, reject) => reject("Failed to logout"))),
  resetPassword: () => (new Promise((resolve, reject) => reject("Failed to reset password"))),
  updateEmail: () => (new Promise((resolve, reject) => reject("Failed to update email"))),
  updatePassword: () => (new Promise((resolve, reject) => reject("Failed to update password")))
});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: FunctionComponent = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    uid: "",
    email: ""
  });
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