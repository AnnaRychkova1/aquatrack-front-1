// import { useEffect } from 'react';
import UserSettingsForm from '../../components/UserSettingsForm/UserSettingsForm';
import UniversalModal from '../Modal/Modal';
import css from './UserSettingsModal.module.css';
const UserSettingsModal = ({ isOpen, closeModal, closePopover }) => {
  const addModalClassName = isOpen ? css.settingModal : '';
  const addOverlayClassName = isOpen ? css.settingOverlay : '';
  return (
    <div className={css.settingsScroll}>
      <UniversalModal
        isOpen={isOpen}
        closeModal={closeModal}
        addModalClassName={addModalClassName}
        addOverlayClassName={addOverlayClassName}
      >
        <div className={css.settingsWrapper}>
          {/* <div className={css.settingsScroll}> */}
          <h2 className={css.settingsTitle}>Setting</h2>
          <UserSettingsForm
            closeModal={closeModal}
            closePopover={closePopover}
          />
        </div>
        {/* </div> */}
      </UniversalModal>
    </div>
  );
};

export default UserSettingsModal;
