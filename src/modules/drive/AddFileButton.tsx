import React, { FunctionComponent, SyntheticEvent, useRef, useState } from "react";
import { folderType, ROOT_FOLDER } from "@hooks/useFolder";
import { useAuth } from "@contexts/AuthContext";
import { useStorage } from "@contexts/StorageContext";
import { useDatabase } from "@contexts/DatabaseContext";
import { documentNames } from "@services/databaseService";

const uuid = require("uuid"); // Issue with importing

interface HTMLInputEvent extends SyntheticEvent {
  target: HTMLInputElement & EventTarget;
}

const AddFileButton: FunctionComponent<{
  currentFolder: folderType
}> = ({ currentFolder }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadingFiles, setUploadingFiles] = useState<{ id: string, name: string, progress: 0, error: boolean }[] | []>([]);
  const { currentUser } = useAuth() ?? { currentUser: null };
  const { uploadSnapshotFile } = useStorage();
  const { addDoc, queryDocs, updateDoc } = useDatabase();

  function handleUpload(e: HTMLInputEvent) {
    if (!currentUser) return;

    const file: File | null = e?.target?.files?.[0] || null;
    if (currentFolder === null || file === null) return;

    const id = uuid.v4();

    setUploadingFiles(prevUploadingFiles => [
      ...prevUploadingFiles,
      { id: id, name: file.name, progress: 0, error: false }
    ]);

    const parentPath = `files/${currentUser.uid}/${currentFolder.path.map(v => v?.name).join("/")}`.replace(/\/$/, "");

    const filePath = currentFolder === ROOT_FOLDER ?
      `${parentPath}/${file.name}` :
      `${parentPath}/${currentFolder.name}/${file.name}`
    ;

    uploadSnapshotFile(
      `${filePath}`,
      file,
      (snapshot) => {
        setUploadingFiles(prevUploadingFiles => {
          return prevUploadingFiles.map(uploadFile => {
            if (uploadFile.id === id) {
              return { ...uploadFile, progress: snapshot.progress };
            } else {
              return uploadFile;
            }
          });
        });
      },
      () => {
        setUploadingFiles(prevUploadingFiles => {
          return prevUploadingFiles.map(uploadFile => {
            if (uploadFile.id === id) {
              return { ...uploadFile, error: true };
            } else {
              return uploadFile;
            }
          });
        });
      },
      async (downloadURL) => {
        setUploadingFiles(prevUploadingFiles => prevUploadingFiles.filter(uploadFile => uploadFile.id !== id));

        const existingFiles = await queryDocs(
          documentNames.FILES,
          [
            { operator: "where", fieldPath: "name", opStr: "==", value: file.name },
            { operator: "where", fieldPath: "userId", opStr: "==", value: currentUser.uid },
            { operator: "where", fieldPath: "folderId", opStr: "==", value: currentFolder.id }
          ]
        );

        const existingFile = existingFiles.docs[0];

        if (existingFile) {
          await updateDoc(existingFile.ref, {
            url: downloadURL
          });
        } else {
          await addDoc(documentNames.FILES, {
            url: downloadURL,
            name: file.name,
            folderId: currentFolder.id,
            userId: currentUser.uid
          });
        }

        if (fileRef.current) {
          fileRef.current.value = "";
        }
      }
    );
  }

  return (
    <>
      <label htmlFor="fileUpload">
        <input type="file" id="fileUpload" ref={fileRef} onChange={handleUpload} />
      </label>
      {uploadingFiles.length > 0 && <div>
        {uploadingFiles.map(file => {
          return (<div key={file.id}>
            {file.name}
            <div>
              {file.progress}
            </div>
          </div>);
        })}
      </div>}
    </>
  );
};

export default AddFileButton;