import React, { createContext, FunctionComponent, useContext } from "react";
import databaseService, { documentType, queryObjectType } from "../services/databaseService";

export interface DatabaseContent {
    getDocById: (docName: documentType, id: string) => Promise<any>,
    getAllDocs: (docName: documentType) => Promise<any>,
    queryDocs: (docName: documentType, queries: Array<queryObjectType>) => Promise<any>,
    querySnapshotDocs: (docName: documentType,
                        queries: Array<queryObjectType>,
                        callback: (snapshot: any) => void) => () => void,
    addDoc: (docName: documentType, data: {}) => Promise<any>,
}

const DatabaseContext = createContext<DatabaseContent>({
    getDocById: () => (new Promise(() => {
    })),
    getAllDocs: () => (new Promise(() => {
    })),
    queryDocs: () => (new Promise(() => {
    })),
    querySnapshotDocs: () => (() => {
    }),
    addDoc: () => (new Promise(() => {
    }))
});

export function useDrive() {
    return useContext(DatabaseContext);
}

export const DriveProvider: FunctionComponent = ({children}) => {
    function getDocById(docName: documentType, id: string) {
        return databaseService.getDocById(docName, id)
    }

    function getAllDocs(docName: documentType) {
        return databaseService.getAllDocs(docName)
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

    function addDoc(docName: documentType, data: {}) {
        return databaseService.addDoc(docName, data);
    }

    const value: DatabaseContent = {
        getDocById,
        getAllDocs,
        queryDocs,
        querySnapshotDocs,
        addDoc,
    };

    return (<DatabaseContext.Provider value={value}>
        {children}
    </DatabaseContext.Provider>)
}

export function withDrive(Component: FunctionComponent) {
    return function WithDrive(props: any) {
        return (<DriveProvider>
            <Component {...props} />
        </DriveProvider>)
    }
}