import {collection, doc, addDoc, getDoc, getDocs, onSnapshot, orderBy, query,  where} from "firebase/firestore";
import type {WhereFilterOp, QueryConstraint} from "firebase/firestore";
import {db} from "../configs/firebase";
import {serverTimestamp} from "../utils/firebaseUtils";

export const documentNames = {
    FOLDERS: "folders",
    FILES: "files"
}

export type documentType = typeof documentNames.FOLDERS | typeof documentNames.FILES;
export type queryObjectType = { operator: operatorType, fieldPath: string, opStr?: WhereFilterOp, value?: unknown };
type operatorType = "where" | "orderBy";

const generateQueries = (queries: Array<queryObjectType>) => {
    return queries.map(({operator, fieldPath, opStr, value}) => {
        switch (operator) {
            case "where":
                if (!opStr) throw ("opStr not defined");
                return where(fieldPath, opStr, value);
            case "orderBy":
                return orderBy("createdAt");
        }
    });
}

const driveService = {
    getDocById: (docName: documentType, id: string) => {
        return getDoc(doc(db, docName, id));
    },
    getAllDocs: (docName: documentType) => {
        return getDocs(collection(db, docName));
    },
    queryDocs: (docName: documentType, queries: Array<queryObjectType>) => {
        try {
            const queriesArray: QueryConstraint[] = generateQueries(queries);

            return getDocs(query(collection(db, docName), ...queriesArray));
        } catch (e) {
            return new Promise((resolve, reject) => reject(e));
        }
    },
    querySnapshotDocs: (docName: documentType, queries: Array<queryObjectType>, callback : (snapshot: any) => void) => {
        try {
            const queriesArray: QueryConstraint[] = generateQueries(queries);

            return onSnapshot(query(collection(db, docName), ...queriesArray), callback);
        } catch (e) {
            callback(e)
            return () => {};
        }
    },
    addDoc: (docName: documentType, data: {}) => {
        return addDoc(collection(db, docName), {...data, createdAt: serverTimestamp()})
    }
}

export default driveService;