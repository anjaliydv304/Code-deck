import { createContext, useState } from "react";

export const modalConstants = {
    CREATE_PLAYGROUND: 'CREATE_PLAYGROUND',
    CREATE_FOLDER: 'CREATE_FOLDER',
    UPDATE_FOLDER_TITLE: 'UPDATE_FOLDER_TITLE',
    UPDATE_FILE_TITLE: 'UPDATE_FILE_TITLE',
    CREATE_CARD: 'CREATE_CARD',
};

export const ModalContext = createContext();

// ModalProvider component that provides the context
export const ModalProvider = ({ children }) => {
    // State for managing active modal type and modal payload
    const [modalType, setModalType] = useState(null);
    const [modalPayload, setModalPayload] = useState(null);

    // Function to close the modal
    const closeModal = () => {
        setModalType(null);
    };

    // Function to open a modal by setting its type
    const openModal = (type) => {
        setModalType(type);
    };

    // Modal context values that will be shared with the components
    const modalFeatures = {
        openModal,
        closeModal,
        activeModal: modalType,
        modalPayload,
        setModalPayload,
    };

    return (
        <ModalContext.Provider value={modalFeatures}>
            {children}
        </ModalContext.Provider>
    );
};
