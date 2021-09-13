/**
 * This code is used in the backend
 */
import * as firebaseAdmin from 'firebase-admin';
import { ServiceAccount } from "firebase-admin/lib/credential";
import * as serviceAccount from "../../dev-goal-planner-firebase-adminsdk.json";

if(!firebaseAdmin.apps.length){
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(<ServiceAccount>serviceAccount),
    })
}

export {firebaseAdmin};

