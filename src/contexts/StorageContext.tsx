import { createContext, FunctionComponent, useContext } from "react";
import storageService from "../services/storageService";

export interface StorageContent {
  uploadSnapshotFile: (
    dir: string,
    file: Blob | Uint8Array | ArrayBuffer,
    callback: (snapshot: any) => unknown,
    error?: (err: any) => unknown,
    complete?: (downloadURL: any) => unknown
  ) => () => any
}

const StorageContext = createContext<StorageContent>({
  uploadSnapshotFile: () => {
    throw "Error occurred when uploading";
  }
});

export function useStorage() {
  return useContext(StorageContext);
}

export const StorageProvider: FunctionComponent = ({ children }) => {

  function uploadSnapshotFile(
    dir: string,
    file: Blob | Uint8Array | ArrayBuffer,
    callback: (snapshot: any) => unknown,
    error?: (err: any) => unknown,
    complete?: (downloadURL: string) => unknown
  ) {
    return storageService.uploadSnapshotFile(dir, file, callback, error, complete);
  }

  const value: StorageContent = {
    uploadSnapshotFile
  };

  return (<StorageContext.Provider value={value}>
    {children}
  </StorageContext.Provider>);
};

export function withStorage(Component: FunctionComponent) {
  return function WithStorage(props: any) {
    return (<StorageProvider>
      <Component {...props} />
    </StorageProvider>);
  };
}