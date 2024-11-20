import React, { useContext } from 'react';
import './index.scss';
import { PlaygroundContext } from '../../../Providers/PlaygroundProvider';  // This is correct for folder management
import { modalConstants, ModalContext } from '../../../Providers/ModalProvider';  // Correct import for ModalContext
import PropTypes from 'prop-types';

const Folder = ({ folderTitle, cards, folderId }) => {
    const { deleteFolder, deleteFile, setModalPayload } = useContext(PlaygroundContext) || {};
    const { openModal } = useContext(ModalContext);  // Correct import here for modal management

    if (!openModal) {
        console.error('openModal is not available in context');
    }

    const onDeleteFolder = () => {
        deleteFolder(folderId); 
    };

    const onEditFolderTitle = () => {
        setModalPayload({ folderId });
        openModal(modalConstants.UPDATE_FOLDER_TITLE);
    };

    const openCreateCardModal = () => {
        setModalPayload({ folderId });
        openModal(modalConstants.CREATE_CARD);
    };

    return (
        <div className="folder-container">
            <div className="folder-header">
                <div className="folder-header-item">
                    <span className="material-icons folder-icon">folder</span>
                    <span>{folderTitle}</span>
                </div>
                <div className="folder-header-item">
                    <span className="material-icons" onClick={onDeleteFolder}>delete</span>
                    <span className="material-icons" onClick={onEditFolderTitle}>edit</span>
                    <button onClick={openCreateCardModal}>
                        <span className="material-icons">add</span>
                        <span>New Playground</span>
                    </button>
                </div>
            </div>
            <div className="cards-container">
                {cards?.map((file, index) => {
                    const onEditFile = () => {
                        setModalPayload({ fileId: file.id, folderId });
                        openModal(modalConstants.UPDATE_FILE_TITLE);
                    };

                    const onDeleteFile = () => {
                        deleteFile(folderId, file.id); 
                    };

                    return (
                        <div className="card" key={index}>
                            <img src="logo.png" alt="File Icon" />
                            <div className="card-item">
                                <span>{file?.title}</span>
                                <span>Language: {file?.language}</span>
                            </div>
                            <div className="card-item">
                                <span className="material-icons" onClick={onDeleteFile}>delete</span>
                                <span className="material-icons" onClick={onEditFile}>edit</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

Folder.propTypes = {
    folderTitle: PropTypes.string.isRequired,
    cards: PropTypes.array.isRequired,
    folderId: PropTypes.string.isRequired,
};

const RightComponent = () => {
    const { folders } = useContext(PlaygroundContext);
    const { openModal } = useContext(ModalContext);  // Correct import for ModalContext

    const openCreateNewFolderModal = () => {
        openModal(modalConstants.CREATE_FOLDER);
    };

    return (
        <div className="right-container">
            <div className="header">
                <div className="title"><span>My</span> Playground</div>
                <button className="add-folder" onClick={openCreateNewFolderModal}>
                    <span className="material-icons">add</span>
                    <span>New Folder</span>
                </button>
            </div>
            {folders?.map((folder, index) => (
                <Folder
                    key={folder.id || index} 
                    folderTitle={folder?.title}
                    cards={folder?.files}
                    folderId={folder.id}
                />
            ))}
        </div>
    );
};

export default RightComponent;
