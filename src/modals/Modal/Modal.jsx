import { useEffect } from 'react';
import Modal from 'react-modal';
import css from './Modal.module.css';
import Iconsvg from '../../components/Icon/Icon';

Modal.setAppElement('#root');

const UniversalModal = ({
  children,
  isOpen,
  closeModal,
  addModalClassName,
  addOverlayClassName,
}) => {
  useEffect(() => {
    const handleEscape = event => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.classList.add(css.modalOpen); // Блокуємо прокрутку сторінки
    } else {
      document.removeEventListener('keydown', handleEscape);
      document.body.classList.remove(css.modalOpen); // Активуємо прокрутку сторінки
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.classList.remove(css.modalOpen);
    };
  }, [isOpen, closeModal]);

  // useEffect(() => {
  //   if (isOpen) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = 'unset';
  //   }
  //   return () => {
  //     document.body.style.overflow = 'unset';
  //   };
  // }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      // className={css.modalContent}
      className={`${css.modalContent} ${addModalClassName}`}
      overlayClassName={`${css.modalBackdrop} ${addOverlayClassName}`}
      shouldCloseOnOverlayClick={true}

      // contentLabel="Example Modal"
    >
      <button className={css.modalCloseButton} onClick={closeModal}>
        <Iconsvg iconName="close" className={css.iconClose} />
      </button>
      <>{children}</>
    </Modal>
  );
};

export default UniversalModal;
