import { useState } from 'react';
import LogOutModal from '../../modals/LogOutModal/LogOutModal';
import UserSettingsModal from '../../modals/UserSettingsModal/UserSettingsModal';
import css from '../UserBarPopover/UserBarPopover.module.css';
import Iconsvg from '../../shared/components/Icon/Icon';
import { useTranslation } from 'react-i18next';

const UserBarPopover = ({ closePopover }) => {
  const { t } = useTranslation();
  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);

  const openSettingModal = () => setIsSettingModalOpen(true);
  const closeSettingModal = () => {
    setIsSettingModalOpen(false);
    closePopover();
  };

  const openLogOutModal = () => setIsLogOutModalOpen(true);
  const closeLogOutModal = () => setIsLogOutModalOpen(false);
  return (
    <div className={css.userPopoverContainer}>
      <button className={css.userPopoverBtn} onClick={openSettingModal}>
        <Iconsvg className={css.userPopoverBtnIcon} iconName={'settings'} />
        <span>{t('trackerPage.settings')}</span>
      </button>
      <button className={css.userPopoverBtn} onClick={openLogOutModal}>
        <Iconsvg className={css.userPopoverBtnIcon} iconName={'log-out'} />
        <span>{t('trackerPage.logout')}</span>
      </button>
      <UserSettingsModal
        isOpen={isSettingModalOpen}
        closeModal={closeSettingModal}
        closePopover={closePopover}
      />
      <LogOutModal isOpen={isLogOutModalOpen} closeModal={closeLogOutModal} />
    </div>
  );
};

export default UserBarPopover;
