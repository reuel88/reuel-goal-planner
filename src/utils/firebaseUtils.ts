import {serverTimestamp} from "firebase/firestore";

const formatDoc = (doc: any): { id: string } => {
    return {
        id: doc.id,
        ...doc.data()
    }
}

export {serverTimestamp, formatDoc};