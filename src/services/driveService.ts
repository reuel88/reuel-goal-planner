import {collection, addDoc, getDocs} from "firebase/firestore";
import {db} from "../configs/firebase";

export const dbDocuments = {
    FOLDERS: "folders",
    FILES: "files"
}

export type dbDocument = typeof dbDocuments.FOLDERS | typeof dbDocuments.FILES;

const driveService = {
    getDocs: (doc: dbDocument) => {
        return getDocs(collection(db, doc));
    },
    addDoc: (doc: dbDocument, data: {}) => {
        return addDoc(collection(db, doc), data)
    }
}

export default driveService;