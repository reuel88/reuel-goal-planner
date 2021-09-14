import React, { createContext, FunctionComponent, useContext } from "react";
import { DocumentReference } from "firebase/firestore";
import databaseService, { documentType, queryObjectType } from "@services/databaseService";

export interface DatabaseContent {
  addDoc: (docName: documentType, data: {}) => Promise<any>,
  getDocById: (docName: documentType, id: string) => Promise<any>,
  getAllDocs: (docName: documentType) => Promise<any>,
  queryDocs: (docName: documentType, queries: Array<queryObjectType>) => Promise<any>,
  querySnapshotDocs: (docName: documentType,
                      queries: Array<queryObjectType>,
                      callback: (snapshot: any) => void) => () => void,
  updateDoc: (reference: DocumentReference, data: {}) => Promise<any>
}

const DatabaseContext = createContext<DatabaseContent | null>(null);

export function useDatabase() {
  return useContext(DatabaseContext);
}

export const DriveProvider: FunctionComponent = ({ children }) => {

  function addDoc(docName: documentType, data: {}) {
    return databaseService.addDoc(docName, data);
  }

  function getDocById(docName: documentType, id: string) {
    return databaseService.getDocById(docName, id);
  }

  function getAllDocs(docName: documentType) {
    return databaseService.getAllDocs(docName);
  }

  function queryDocs(docName: documentType, queries: Array<queryObjectType>) {
    return databaseService.queryDocs(docName, queries);
  }

  function querySnapshotDocs(
    docName: documentType,
    queries: Array<queryObjectType>,
    callback: (snapshot: any) => void
  ) {
    return databaseService.querySnapshotDocs(docName, queries, callback);
  }

  function updateDoc(reference: DocumentReference, data: {}) {
    return databaseService.updateDoc(reference, data);
  }

  const value: DatabaseContent = {
    addDoc,
    getDocById,
    getAllDocs,
    queryDocs,
    querySnapshotDocs,
    updateDoc
  };

  return (<DatabaseContext.Provider value={value}>
    {children}
  </DatabaseContext.Provider>);
};

export function withDatabase(Component: FunctionComponent) {
  return function WithDatabase(props: any) {
    return (<DriveProvider>
      <Component {...props} />
    </DriveProvider>);
  };
}