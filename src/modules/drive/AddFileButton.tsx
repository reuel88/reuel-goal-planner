import React, { FunctionComponent, SyntheticEvent } from "react";
import { folderType, ROOT_FOLDER } from "../../hooks/useFolder";
import { useAuth } from "../../contexts/AuthContext";
import { useStorage } from "../../contexts/StorageContext";

interface HTMLInputEvent extends SyntheticEvent {
    target: HTMLInputElement & EventTarget;
}

const AddFileButton: FunctionComponent<{
    currentFolder: folderType
}> = ({currentFolder}) => {
    const {currentUser} = useAuth();
    const {uploadSnapshotFile} = useStorage();

    function handleUpload(e: HTMLInputEvent) {
        const file: File | null = e?.target?.files?.[0] || null;
        if (currentFolder === null || file === null) return;

        const parentPath = `files/${currentUser.uid}/${currentFolder.path.map(v => v?.name).join('/')}`.replace(/\/$/, '');

        const filePath = currentFolder === ROOT_FOLDER ?
            `${parentPath}/${file.name}` :
            `${parentPath}/${currentFolder.name}/${file.name}`
        ;

       uploadSnapshotFile(`${filePath}`, file);
    }

    return (
        <label htmlFor="fileUpload">
            <input type="file" id="fileUpload" onChange={handleUpload} />
        </label>
    );
}

export default AddFileButton;