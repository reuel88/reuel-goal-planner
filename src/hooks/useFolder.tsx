import {useEffect, useReducer} from "react";
import {documentNames} from "../services/driveService";
import {formatDoc} from "../utils/firebaseUtils";
import {useAuth} from "../contexts/AuthContext";
import {useDrive} from "../contexts/DriveContext";

export type folderType = { name: string, id: string | null, path: Array<any> }
type folderIdType = string | null;
type actionType = typeof ACTIONS.SELECT_FOLDER | typeof ACTIONS.UPDATE_FOLDER | typeof ACTIONS.SET_CHILD_FOLDERS;
type payloadType = {
    folderId?: string | null,
    folder?: {} | null,
    childFolders?: Array<folderType>,
    childFiles?: Array<any>,
}

const ACTIONS = {
    SELECT_FOLDER: "select-folder",
    UPDATE_FOLDER: "update-folder",
    SET_CHILD_FOLDERS: "set-child-folders",
}

const ROOT_FOLDER = {
    name: 'Root', id: null, path: []
}

function reducer(state: any, {type, payload}: { type: actionType, payload: payloadType }) {
    switch (type) {
        case ACTIONS.SELECT_FOLDER:
            return {
                folderId: payload.folderId,
                folder: payload.folder,
                childFolders: [],
                childFiles: []
            };
        case ACTIONS.UPDATE_FOLDER:
            return {...state, folder: payload.folder}
        case ACTIONS.SET_CHILD_FOLDERS:
            return {...state, childFolders: payload.childFolders}
        default:
            return state
    }
}

export function useFolder(
    folderId: folderIdType = null,
    folder: folderType | null = null
) {
    const {currentUser} = useAuth();
    const {getDocById, querySnapshotDocs} = useDrive();

    const [state, dispatch] = useReducer(reducer, {
        folderId,
        folder,
        childFolders: [],
        childFiles: []
    });

    useEffect(() => {
        dispatch({
            type: ACTIONS.SELECT_FOLDER,
            payload: {folderId, folder}
        });
    }, [folder, folderId]);

    useEffect(() => {
        if (folderId === null) {
            return dispatch({
                type: ACTIONS.UPDATE_FOLDER,
                payload: {
                    folder: ROOT_FOLDER
                }
            })
        }

        getDocById(documentNames.FOLDERS, folderId)
            .then(doc => {
                const formattedDoc = formatDoc(doc);

                return dispatch({
                    type: ACTIONS.UPDATE_FOLDER,
                    payload: {
                        folder: formattedDoc
                    }
                })

            })
            .catch(e => {
                console.error(e);

                return dispatch({
                    type: ACTIONS.UPDATE_FOLDER,
                    payload: {
                        folder: ROOT_FOLDER
                    }
                })
            });

    }, [folderId, getDocById]);

    useEffect(() => {
        const cleanup = querySnapshotDocs(
            documentNames.FOLDERS,
            [
                {operator: "where", fieldPath: "parentId", opStr: "==", value: folderId},
                {operator: "where", fieldPath: "userId", opStr: "==", value: currentUser.uid},
                {operator: "orderBy", fieldPath: "createdAt"},
            ],
            (snapshot) => {
                dispatch({
                    type: ACTIONS.SET_CHILD_FOLDERS,
                    payload: {
                        childFolders: snapshot.docs.map(formatDoc)
                    }
                })
            })

        return () => cleanup();
    }, [folderId, currentUser, querySnapshotDocs])

    return state;
}