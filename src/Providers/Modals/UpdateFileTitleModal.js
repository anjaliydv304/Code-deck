import { useContext } from "react"
import { ModalContext } from "../ModalProvider"
import { createFolderStyles } from "./CreateFolderModal";
import "./createPlaygroundModal.scss"
import { PlaygroundContext } from "../PlaygroundProvider";

export const UpdateFileTitleModal = ()=>{

    const {closeModal,modalPayload} = useContext(ModalContext);
    const {editFileTitle}=useContext(PlaygroundContext)
    const onSubmitModal = (e) =>{
        
        e.preventDefault();
        const fileName=e.target.fileName.value;
        editFileTitle(fileName,modalPayload.folderId,modalPayload.fileId);
        closeModal();
    }
    return <div className="modal-container">

       <form className="modal-body" onsubmit={onSubmitModal}>

       <span onClick={closeModal} className="material-icons close">close</span>

            <h1>Update Card title</h1>

            <div style={createFolderStyles.inputContainer}>

                <input required name="folderName" style={createFolderStyles.input} placeholder="Enter Folder Name"/>

                <button style={createFolderStyles.btn} type="submit">Create Folder</button>

            </div>

        </form>
</div>

}