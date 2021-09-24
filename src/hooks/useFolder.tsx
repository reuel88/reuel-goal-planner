import { useEffect, useReducer } from "react";
import { documentNames } from "@services/databaseService";
import { formatDoc } from "@utils/firebaseUtils";
import { useAuth } from "@contexts/AuthContext";
import { useDatabase } from "@contexts/DatabaseContext";

const ACTIONS = {
  SELECT_FOLDER: "select-folder",
  UPDATE_FOLDER: "update-folder",
  SET_CHILD_FOLDERS: "set-child-folders",
  SET_CHILD_FILES: "set-child-files"
};

type actionType = typeof ACTIONS.SELECT_FOLDER | typeof ACTIONS.UPDATE_FOLDER | typeof ACTIONS.SET_CHILD_FOLDERS;

export interface folderType {
  id: string | null,
  name: string,
  path: Array<null | { id: string, name: string }>
}

export interface fileType {
  id: string | null,
  name: string,
  url: string
}

interface payloadType {
  folderId?: string | null,
  folder?: {} | null,
  childFolders?: Array<folderType>,
  childFiles?: Array<fileType>,
}

export const ROOT_FOLDER = {
  name: "Root", id: null, path: []
};

function reducer(state: any, { type, payload }: { type: actionType, payload: payloadType }) {
  switch (type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        childFolders: [],
        childFiles: []
      };
    case ACTIONS.UPDATE_FOLDER:
      return { ...state, folder: payload.folder };
    case ACTIONS.SET_CHILD_FOLDERS:
      return { ...state, childFolders: payload.childFolders };
    case ACTIONS.SET_CHILD_FILES:
      return { ...state, childFiles: payload.childFiles };
    default:
      return state;
  }
}

export function useFolder(
  folderId: string | null = null,
  folder: folderType | null = null
) {
  const { currentUser } = useAuth() ?? { currentUser: null };
  const { getDocById, querySnapshotDocs } = useDatabase() ?? { getDocById: null, querySnapshotDocs: null };

  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFolders: [],
    childFiles: []
  });

  useEffect(() => {
    dispatch({
      type: ACTIONS.SELECT_FOLDER,
      payload: { folderId, folder }
    });
  }, [folder, folderId]);

  useEffect(() => {
    if (folderId === null) {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: {
          folder: ROOT_FOLDER
        }
      });
    }

    if (!getDocById) return;

    getDocById(documentNames.FOLDERS, folderId)
      .then((doc: any) => {
        const formattedDoc = formatDoc(doc);

        return dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: {
            folder: formattedDoc
          }
        });

      })
      .catch(() => {
        return dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: {
            folder: ROOT_FOLDER
          }
        });
      });

  }, [folderId, getDocById]);

  useEffect(() => {
    if (!currentUser || !querySnapshotDocs) return;

    return querySnapshotDocs(
      documentNames.FOLDERS,
      [
        { operator: "where", fieldPath: "parentId", opStr: "==", value: folderId },
        { operator: "where", fieldPath: "userId", opStr: "==", value: currentUser.uid },
        { operator: "orderBy", fieldPath: "createdAt" }
      ],
      (snapshot: any) => {
        dispatch({
          type: ACTIONS.SET_CHILD_FOLDERS,
          payload: {
            childFolders: snapshot.docs.map(formatDoc)
          }
        });
      });
  }, [folderId, currentUser, querySnapshotDocs]);

  useEffect(() => {
    if (!currentUser || !querySnapshotDocs) return;

    return querySnapshotDocs(
      documentNames.FILES,
      [
        { operator: "where", fieldPath: "folderId", opStr: "==", value: folderId },
        { operator: "where", fieldPath: "userId", opStr: "==", value: currentUser.uid },
        { operator: "orderBy", fieldPath: "createdAt" }
      ],
      (snapshot: any) => {
        dispatch({
          type: ACTIONS.SET_CHILD_FILES,
          payload: {
            childFiles: snapshot.docs.map(formatDoc)
          }
        });
      }
    );

  }, [folderId, currentUser, querySnapshotDocs]);

  return state;
}