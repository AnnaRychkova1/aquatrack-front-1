import { createContext, useState, useCallback } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState({
    camper_modal: null,
    images_modal: null,
  });
  const [isOpen, setIsOpen] = useState({
    camper_modal: false,
    images_modal: false,
  });

  const openModal = useCallback((modalName, content) => {
    setModalContent(prevContent => ({ ...prevContent, [modalName]: content }));
    setIsOpen(prevState => ({ ...prevState, [modalName]: true }));
  }, []);

  const closeModal = useCallback(modalName => {
    setIsOpen(prevState => ({ ...prevState, [modalName]: false }));
    setModalContent(prevContent => ({ ...prevContent, [modalName]: null }));
  }, []);

  return (
    <ModalContext.Provider
      value={{ isOpen, openModal, closeModal, modalContent }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
