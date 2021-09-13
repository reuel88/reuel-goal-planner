import { firebaseAdmin } from "../configs/firebaseBackend";

const authClientService = {
    verifyIdToken: (token: any) => {
        return firebaseAdmin.auth().verifyIdToken(token)
    }
}

export default authClientService;