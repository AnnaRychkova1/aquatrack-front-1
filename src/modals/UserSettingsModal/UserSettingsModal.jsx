import UserSettingsForm from '../../components/UserSettingsForm/UserSettingsForm';
import UniversalModal from '../Modal/Modal';
import css from './UserSettingsModal.module.css';
const UserSettingsModal = ({ isOpen, closeModal }) => {
  return (
    <UniversalModal
      isOpen={isOpen}
      closeModal={closeModal}
      className={css.settingsModal}
    >
      <div className={css.settingsWrapper}>
        <div className={css.settingsScroll}>
          <h2 className={css.settingsTitle}>Setting</h2>
          <UserSettingsForm />
        </div>
      </div>
    </UniversalModal>
  );
};

export default UserSettingsModal;
