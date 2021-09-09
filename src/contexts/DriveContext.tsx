import React, { createContext, FunctionComponent, useContext } from "react";
import driveService, { documentType, queryObjectType } from "../services/driveService";

export type DriveContent = {
    getDocById: (docName: documentType, id: string) => Promise<any>,
    getAllDocs: (docName: documentType) => Promise<any>,
    queryDocs: (docName: documentType, queries: Array<queryObjectType>) => Promise<any>,
    querySnapshotDocs: (docName: documentType,
                        queries: Array<queryObjectType>,
                        callback: (snapshot: any) => void) => () => void,
    addDoc: (docName: documentType, data: {}) => Promise<any>,
}

const DriveContext = createContext<DriveContent>({
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
    return useContext(DriveContext);
}

export const DriveProvider: FunctionComponent = ({children}) => {

    function getDocById(docName: documentType, id: string) {
        return driveService.getDocById(docName, id)
    }

    function getAllDocs(docName: documentType) {
        return driveService.getAllDocs(docName)
    }

    function queryDocs(docName: documentType, queries: Array<queryObjectType>) {
        return driveService.queryDocs(docName, queries);
    }

    function querySnapshotDocs(
        docName: documentType,
        queries: Array<queryObjectType>,
        callback: (snapshot: any) => void
    ) {
        return driveService.querySnapshotDocs(docName, queries, callback);
    }

    function addDoc(docName: documentType, data: {}) {
        return driveService.addDoc(docName, data);
    }

    const value: DriveContent = {
        getDocById,
        getAllDocs,
        queryDocs,
        querySnapshotDocs,
        addDoc,
    };

    return (<DriveContext.Provider value={value}>
        {children}
    </DriveContext.Provider>)
}

export function withDrive(Component: FunctionComponent) {
    return function WithDrive(props: any) {
        return (<DriveProvider>
            <Component {...props} />
        </DriveProvider>)
    }
}