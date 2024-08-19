import { createContext, useState, useCallback } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modalStyles, setModalStyles] = useState({});

  const openModal = useCallback((content, styles = {}) => {
    setModalContent(content);
    setModalStyles(styles);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setModalContent(null);
    setModalStyles({});
  }, []);

  return (
    <ModalContext.Provider
      value={{ isOpen, openModal, closeModal, modalContent, modalStyles }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
