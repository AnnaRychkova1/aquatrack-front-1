import Modal from 'react-modal';
import css from './Modal.module.css';
import Iconsvg from '../../shared/components/Icon/Icon';

Modal.setAppElement('#root');

const UniversalModal = ({
  children,
  isOpen,
  closeModal,
  addModalClassName,
  addOverlayClassName,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className={`${css.modalContent} ${addModalClassName}`}
      overlayClassName={`${css.modalBackdrop} ${addOverlayClassName}`}
      shouldCloseOnOverlayClick={true}
    >
      <button className={css.modalCloseButton} onClick={closeModal}>
        <Iconsvg iconName="close" className={css.iconClose} />
      </button>
      <>{children}</>
    </Modal>
  );
};

export default UniversalModal;
