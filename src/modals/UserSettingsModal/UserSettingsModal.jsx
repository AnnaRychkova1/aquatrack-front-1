import { useTranslation } from 'react-i18next';
import css from './UserSettingsModal.module.css';
import Iconsvg from '../../shared/components/Icon/Icon';
import UserSettingsForm from '../../forms/UserSettingsForm/UserSettingsForm';
import { useModalContext } from '../../context/useModalContext';

const UserSettingsModal = ({ closePopover }) => {
  const { t } = useTranslation();
  const { closeModal } = useModalContext();
  const handleClose = () => {
    closeModal();
    closePopover();
  };
  return (
    <div className={css.settingsWrapper}>
      <div className={css.topContainer}>
        <h2 className={css.settingsTitle}>{t('modals.setting')}</h2>
        <button className={css.modalCloseButton} onClick={handleClose}>
          <Iconsvg iconName="close" className={css.iconClose} />
        </button>
      </div>
      <UserSettingsForm handleClose={handleClose} />
    </div>
  );
};

export default UserSettingsModal;
