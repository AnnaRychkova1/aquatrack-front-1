import UniversalModal from '../Modal/Modal';

const LogOutModal = ({ isOpen, closeModal }) => {
  return (
    <UniversalModal isOpen={isOpen} closeModal={closeModal}>
      <p>LogOutModal</p>
    </UniversalModal>
  );
};

export default LogOutModal;
