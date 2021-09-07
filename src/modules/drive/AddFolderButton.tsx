import React, {FunctionComponent, ElementRef, useRef, useState, SyntheticEvent} from "react";
import Modal from "../../components/Modal";
import driveService, {dbDocuments} from "../../services/driveService";

type ModalHandle = ElementRef<typeof Modal>;

const AddFolderButton: FunctionComponent = () => {
    const modalRef = useRef<ModalHandle>(null);
    const [name, setName] = useState('');

    function openModal() {
        modalRef?.current?.handleOpen();
    }

    function closeModal() {
        modalRef?.current?.handleClose();
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try{
            // Create a folder in the database
            await driveService.addDoc(dbDocuments.FOLDERS,{
                name: name
            });

            setName('');
            closeModal();
        }catch (e){
            console.error(e)
        }
    }

    return (
        <>
            <button type="button" onClick={openModal}>Add Folder</button>

            <section className="modal">

            </section>

            <Modal ref={modalRef}>
                <div className="modal-wrapper">
                    <header className="modal-header">
                        Something
                        <button onClick={closeModal}>close</button>
                    </header>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">

                            <div className="form-group">
                                <label htmlFor="name" className="form-label">Folder Name</label>
                                <input type="text" className="form-control" id="name" value={name}
                                       onChange={(e) => setName(e.target.value)}/>
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
}

export default AddFolderButton;