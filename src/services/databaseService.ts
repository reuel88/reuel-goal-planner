import type { DocumentReference, QueryConstraint, WhereFilterOp } from "firebase/firestore";
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where
} from "firebase/firestore";
import { db } from "@configs/firebaseClient";
import { serverTimestamp } from "../utils/firebaseUtils";

export const documentNames = {
  FOLDERS: "folders",
  FILES: "files"
};

export type documentType = typeof documentNames.FOLDERS | typeof documentNames.FILES;
type operatorType = "where" | "orderBy";

export interface queryObjectType {
  operator: operatorType,
  fieldPath: string,
  opStr?: WhereFilterOp,
  value?: unknown
}

const generateQueries = (queries: Array<queryObjectType>) => {
  return queries.map(({ operator, fieldPath, opStr, value }) => {
    switch (operator) {
      case "where":
        if (!opStr) throw ("opStr not defined");
        return where(fieldPath, opStr, value);
      case "orderBy":
        return orderBy("createdAt");
    }
  });
};

const databaseService = {
  addDoc: (docName: documentType, data: {}) => {
    return addDoc(collection(db, docName), { ...data, createdAt: serverTimestamp() });
  },
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
  querySnapshotDocs: (docName: documentType, queries: Array<queryObjectType>, callback: (snapshot: any) => void) => {
    try {
      const queriesArray: QueryConstraint[] = generateQueries(queries);

      return onSnapshot(query(collection(db, docName), ...queriesArray), callback);
    } catch (e) {
      callback(e);
      return () => {
      };
    }
  },
  updateDoc: (reference: DocumentReference, data: {}) => {
    return updateDoc(reference, { ...data, modifiedAt: serverTimestamp() });
  }
};

export default databaseService;