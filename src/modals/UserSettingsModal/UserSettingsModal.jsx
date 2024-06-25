import UserSettingsForm from '../../components/UserSettingsForm/UserSettingsForm';
import UniversalModal from '../Modal/Modal';
import css from '../../components/UserSettingsForm/UserSettingsForm.module.css';
const UserSettingsModal = ({ isOpen, closeModal }) => {
  return (
    <UniversalModal isOpen={isOpen} closeModal={closeModal}>
      <div className={css.settingsWrapper}>
        <h2>Setting</h2>
        <UserSettingsForm />
      </div>
    </UniversalModal>
  );
};

export default UserSettingsModal;
