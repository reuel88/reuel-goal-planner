import React, { FunctionComponent, ElementRef, useRef, useState, SyntheticEvent } from "react";
import validate from "validate.js";
import Modal from "../common/Modal";
import { useDatabase } from "@contexts/DatabaseContext";
import { useAuth } from "@contexts/AuthContext";
import { documentNames } from "@services/databaseService";
import { folderType, ROOT_FOLDER } from "@hooks/useFolder";

type ModalHandle = ElementRef<typeof Modal>;

const AddFolderButton: FunctionComponent<{
  currentFolder: folderType
}> = ({ currentFolder }) => {
  const modalRef = useRef<ModalHandle>(null);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const { currentUser } = useAuth() ?? { currentUser: null };
  const { addDoc } = useDatabase();

  function openModal() {
    modalRef?.current?.handleOpen();
  }

  function closeModal() {
    modalRef?.current?.handleClose();
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setError("");

    if (!currentFolder || !currentUser) return;

    const path = [...currentFolder.path];
    if (currentFolder !== ROOT_FOLDER && currentFolder.id) {
      path.push({ name: currentFolder.name, id: currentFolder.id });
    }

    const notValid = validate({ name }, {
      name: { presence: { allowEmpty: false } }
    });

    if (notValid) {
      const firstKey = Object.keys(notValid)[0];
      const firstError = notValid[firstKey][0];
      return setError(firstError);
    }

    try {
      // Create a folder in the database
      await addDoc(documentNames.FOLDERS, {
        name: name,
        parentId: currentFolder.id,
        userId: currentUser.uid,
        path: path
      });
      setName("");
      closeModal();
    } catch (e: any) {
      console.error(e);
      setError(e.message);
    }
  }

  return (
    <>
      <button type="button" onClick={openModal}>Add Folder</button>

      <Modal ref={modalRef}>
        <div className="modal-wrapper">
          <header className="modal-header">
            Add New Folder
            <button onClick={closeModal}>close</button>
          </header>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="modal-body">

              <div className="form-group">
                <label htmlFor="name" className="form-label">Folder Name</label>
                <input type="text" className="form-control" id="name" value={name}
                       onChange={(e) => setName(e.target.value)} />
              </div>

            </div>
            <footer className="modal-footer">
              <button type="button" onClick={closeModal}>
                Cancel
              </button>
              <button type="submit">
                Add Folder
              </button>
            </footer>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AddFolderButton;