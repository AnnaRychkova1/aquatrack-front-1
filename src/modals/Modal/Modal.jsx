import { useEffect } from 'react';
import Modal from 'react-modal';
import css from './Modal.module.css';
import Iconsvg from '../../components/Icon/Icon';

Modal.setAppElement('#root');

const UniversalModal = ({ children, isOpen, closeModal }) => {
  // useEffect(() => {
  //   const handleEscape = event => {
  //     if (event.key === 'Escape') {
  //       closeModal();
  //     }
  //   };

  //   if (isOpen) {
  //     document.addEventListener('keydown', handleEscape);
  //   } else {
  //     document.removeEventListener('keydown', handleEscape);
  //   }

  //   return () => {
  //     document.removeEventListener('keydown', handleEscape);
  //   };
  // }, [isOpen, closeModal]);

  useEffect(() => {
    const handleEscape = event => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [closeModal]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className={css.modalContent}
      overlayClassName={css.modalBackdrop}
      shouldCloseOnOverlayClick={true}
      // contentLabel="Example Modal"
    >
      {/* <div className={css.modalContent}> */}
      <button className={css.modalCloseButton} onClick={closeModal}>
        <Iconsvg iconName="close" className={css.iconClose} />
      </button>
      <div className={css.modalBody}>{children}</div>
      {/* </div> */}
    </Modal>
  );
};

export default UniversalModal;
