import UserLogOut from '../../components/UserLogOut/UserLogOut';
import UniversalModal from '../Modal/Modal';

const LogOutModal = ({ isOpen, closeModal }) => {
  return (
    <UniversalModal isOpen={isOpen} closeModal={closeModal}>
      <UserLogOut closeModal={closeModal} />
    </UniversalModal>
  );
};

export default LogOutModal;
