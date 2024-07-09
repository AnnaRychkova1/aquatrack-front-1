// import { useEffect } from 'react';
import UserSettingsForm from '../../components/UserSettingsForm/UserSettingsForm';
import UniversalModal from '../Modal/Modal';
import css from './UserSettingsModal.module.css';
const UserSettingsModal = ({ isOpen, closeModal, closePopover }) => {
  const additionalClassName = isOpen ? css.settingModal : '';
  return (
    <UniversalModal
      isOpen={isOpen}
      closeModal={closeModal}
      additionalClassName={additionalClassName}
    >
      <div className={css.settingsWrapper}>
        <div className={css.settingsScroll}>
          {/* <div className={css.scrollContainer}> */}
          <h2 className={css.settingsTitle}>Setting</h2>
          <UserSettingsForm
            closeModal={closeModal}
            closePopover={closePopover}
          />
        </div>
      </div>
      {/* </div> */}
    </UniversalModal>
  );
};

export default UserSettingsModal;
