import "./Modal";
import { useContext } from "react";
import { ModalContext } from "../ModalProvider";
import { PlaygroundContext } from "../PlaygroundProvider";
export const CreatePlaygroundModal=()=>{
    const modalFeatures=useContext(ModalContext);
    const playgroundFeatures=useContext(PlaygroundContext);
    const closeModal=()=>{
        modalFeatures.closeModal()
    }
    const onSubmitModal = (e) => {
        e.preventDefault();
        const folderName = e.target.folderName?.value?.trim();
        const fileName = e.target.fileName?.value?.trim();
        const language = e.target.language?.value;
    
        // Ensure all fields have valid data
        if (!folderName || !fileName || !language) {
            alert("Please fill all fields!");
            return;
        }
    
        playgroundFeatures.createNewPlayground({
            folderName,
            fileName,
            language,
        });
        closeModal();
    };
    
    return <div className="modal-container">
        <form className="modal-body" onSubmit={onSubmitModal}>
            <span onClick={closeModal} className="material-icons close">close</span>
            <h1>Create New  Playground</h1>
            <div className="item">
               <p>Enter folder Name</p>
               <input name="folderName" required/>
            </div>
            <div className="item">
               <p>Enter card name</p>
               <input name="fileName" required/>
            </div>
            <div className="item">
               <select name="language" required>
                 <option value="cpp">CPP</option>
                 <option value="java">Java</option>
                 <option value="javascript">JavaScript</option>
                 <option value="python">Python</option>
               </select>
               <button type="submit" onClick={onSubmitModal}>
                   Create Playground
               </button>
            </div>
        </form>
    </div>
}