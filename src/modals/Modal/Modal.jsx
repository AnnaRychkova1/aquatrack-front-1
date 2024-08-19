import Modal from 'react-modal';
import css from './Modal.module.css';
import Iconsvg from '../../shared/components/Icon/Icon';
import { useModalContext } from '../../context/useModalContext';

Modal.setAppElement('#root');

const UniversalModal = () => {
  const { isOpen, closeModal, modalContent, modalStyles } = useModalContext();
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      className={`${css.modalContent} ${modalStyles.modalClassName}`}
      overlayClassName={`${css.modalBackdrop} ${modalStyles.overlayClassName}`}
    >
      <button className={css.modalCloseButton} onClick={closeModal}>
        <Iconsvg iconName="close" className={css.iconClose} />
      </button>
      {modalContent}
    </Modal>
  );
};

export default UniversalModal;
