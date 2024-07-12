import { useTranslation } from 'react-i18next';
import Iconsvg from '../../components/Icon/Icon';
import UserSettingsForm from '../../components/UserSettingsForm/UserSettingsForm';
import UniversalModal from '../Modal/Modal';
import css from './UserSettingsModal.module.css';
const UserSettingsModal = ({ isOpen, closeModal, closePopover }) => {
  const { t } = useTranslation();
  const addModalClassName = isOpen ? css.settingModal : '';
  const addOverlayClassName = isOpen ? css.settingOverlay : '';
  return (
    <UniversalModal
      isOpen={isOpen}
      closeModal={closeModal}
      addModalClassName={addModalClassName}
      addOverlayClassName={addOverlayClassName}
    >
      <div className={css.settingsWrapper}>
        <div className={css.topContainer}>
          <h2 className={css.settingsTitle}>{t('modals.setting')}</h2>
          <button className={css.modalCloseButton} onClick={closeModal}>
            <Iconsvg iconName="close" className={css.iconClose} />
          </button>
        </div>
        <UserSettingsForm closeModal={closeModal} closePopover={closePopover} />
      </div>
    </UniversalModal>
  );
};

export default UserSettingsModal;
