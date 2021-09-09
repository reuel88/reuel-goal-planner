import { createContext, FunctionComponent, useContext } from "react";
import storageService from "../services/storageService";

export interface StorageContent {
    uploadSnapshotFile: (dir: string, file: Blob | Uint8Array | ArrayBuffer) => () => any
}

const StorageContext = createContext<StorageContent>({
    uploadSnapshotFile: () => {
        throw "Error occurred when uploading"
    }
});

export function useStorage() {
    return useContext(StorageContext);
}

export const StorageProvider: FunctionComponent = ({children}) => {

    function uploadSnapshotFile(dir: string, file: Blob | Uint8Array | ArrayBuffer) {
        return storageService.uploadSnapshotFile(dir, file)
    }

    const value = {
        uploadSnapshotFile
    };

    return (<StorageContext.Provider value={value}>
        {children}
    </StorageContext.Provider>)
}

export function withStorage(Component: FunctionComponent) {
    return function WithStorage(props: any) {
        return (<StorageProvider>
            <Component {...props} />
        </StorageProvider>)
    }
}