import { useContext } from "react";
import { createFolderStyles } from "./CreateFolderModal"
import "./createPlaygroundModal.scss"
import { ModalContext } from "../ModalProvider";
import { PlaygroundContext } from "../PlaygroundProvider";

export const UpdateFolderTitleModal = () => {

    const { closeModal, modalPayload } = useContext(ModalContext);

    const { editFolderTitle } = useContext(PlaygroundContext);


    const onSubmitModal = (e) => {

        e.preventDefault();

        const folderName = e.target.folderName.value;
        editFolderTitle(folderName, modalPayload);
        closeModal();
    }
    return <div className="modal-container">

        <form className="modal-body" onSubmit={onSubmitModal}>

            <span onClick={closeModal} className="material-icons close">close</span>

            <h1>Update Folder title</h1>

            <div style={createFolderStyles.inputContainer}>

            <input required name="folderName" style={createFolderStyles.input} placeholder="Enter Folder Name"/>

            <button style={createFolderStyles.btn} type="submit">Create Folder</button>

    </div>

</form>

</div>
}