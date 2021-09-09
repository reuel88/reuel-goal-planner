/**
 * Based on this https://colinhacks.com/essays/nextjs-firebase-authentication
 */

import { getApps, initializeApp } from "firebase/app";
import { getAuth , setPersistence, browserSessionPersistence} from "firebase/auth";

let auth: any;

if (typeof window !== 'undefined' && !getApps().length) {
    const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
    }

    initializeApp(firebaseConfig);
    auth = getAuth()

    setPersistence(auth, browserSessionPersistence);
}

export { auth } ;
