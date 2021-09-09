import nookies from 'nookies';
import React, { createContext, useContext, useEffect, useState, FunctionComponent } from "react";
import authClientService, { AuthUser } from "../services/authClientService";

export interface AuthContent {
    currentUser: AuthUser | null,
    signUp: (email: string, password: string) => Promise<any>,
    signIn: (email: string, password: string) => Promise<any>,
    signOut: () => Promise<any>,
    resetPassword: (email: string) => Promise<any>,
    updateEmail: (email: string) => Promise<any>,
    updatePassword: (password: string) => Promise<any>,
}

const AuthContext = createContext<AuthContent>({
    currentUser: {
        uid: '',
        email: '',
        getIdToken: () => (new Promise((resolve, reject) => reject("Failed to get token")))
    },
    signUp: () => (new Promise((resolve, reject) => reject("Failed to register"))),
    signIn: () => (new Promise((resolve, reject) => reject("Failed to sign in"))),
    signOut: () => (new Promise((resolve, reject) => reject("Failed to logout"))),
    resetPassword: () => (new Promise((resolve, reject) => reject("Failed to reset password"))),
    updateEmail: () => (new Promise((resolve, reject) => reject("Failed to update email"))),
    updatePassword: () => (new Promise((resolve, reject) => reject("Failed to update password"))),
});

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider: FunctionComponent = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    function signUp(email: string, password: string) {
        return authClientService.signUp(email, password);
    }

    function signIn(email: string, password: string) {
        return authClientService.signIn(email, password);
    }

    function signOut() {
        return authClientService.signOut();
    }

    function resetPassword(email: string) {
        return authClientService.resetPassword(email);
    }

    function updateEmail(email: string) {
        return authClientService.updateEmail(email)
    }

    function updatePassword(password: string) {
        return authClientService.updatePassword(password);
    }

    // listen for token changes
    // call setUser and write new token as a cookie
    useEffect(() => {
        return authClientService.idTokenChanged(async (user: any) => {
            if(!user){
                setCurrentUser(null);
                nookies.set(undefined, 'token', '', { path: '/' });
            } else {
                const token = await user.getIdToken()
                setCurrentUser(user);
                nookies.set(undefined, 'token', token, { path: '/' });
            }
            setLoading(false);
        });
    }, []);

    // force refresh the token every 10 minutes
    useEffect(() => {
        const handle = setInterval(async () => {
            const user = authClientService.getCurrentUser();
            if (user) await user.getIdToken(true);
        }, 10 * 60 * 1000);

        // clean up setInterval
        return () => clearInterval(handle);
    }, []);

    const value: AuthContent = {
        currentUser,
        signUp,
        signIn,
        signOut,
        resetPassword,
        updateEmail,
        updatePassword
    }

    return (<AuthContext.Provider value={value}>
        {loading && <div>...loading</div>}
        {!loading && children}
    </AuthContext.Provider>)
}