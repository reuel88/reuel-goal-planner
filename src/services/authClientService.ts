import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    onIdTokenChanged,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    updateEmail,
    updatePassword
} from "firebase/auth";
import { auth } from "../configs/firebaseClient";

export interface AuthUser {
    uid: string,
    email: string,
    getIdToken: () => Promise<any>
}

const authClientService = {
    getCurrentUser: () => {
        return auth.currentUser;
    },
    signUp: (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    },
    signIn: (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    },
    signOut: () => {
        return signOut(auth);
    },
    resetPassword: (email: string) => {
        return sendPasswordResetEmail(auth, email);
    },
    updateEmail: (email: string) => {
        if (!auth.currentUser) {
            return new Promise((resolve, reject) => reject('auth.currentUser not set'))
        }

        return updateEmail(auth.currentUser, email);
    },
    updatePassword: (password: string) => {
        if (!auth.currentUser) {
            return new Promise((resolve, reject) => reject('auth.currentUser not set'))
        }

        return updatePassword(auth.currentUser, password);
    },
    authStateChanged: (callback: (user: any) => void) => {
        return onAuthStateChanged(auth, callback);
    },
    idTokenChanged: (callback: (user: any) => void) => {
        return onIdTokenChanged(auth, callback)
    },
}

export default authClientService;