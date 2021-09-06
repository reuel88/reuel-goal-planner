import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    updateEmail,
    updatePassword
} from "firebase/auth";
import {auth} from "../configs/firebase";

const authService = {
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
        if(!auth.currentUser){
            return new Promise((resolve, reject) => reject('auth.currentUser not set'))
        }

        return updateEmail(auth.currentUser, email);
    },
    updatePassword: (password: string) => {
        if(!auth.currentUser){
            return new Promise((resolve, reject) => reject('auth.currentUser not set'))
        }

        return updatePassword(auth.currentUser, password);
    },
    authListener: (callback: (user: any) => void) => {
        return onAuthStateChanged(auth, callback);
    }

}

export default authService;