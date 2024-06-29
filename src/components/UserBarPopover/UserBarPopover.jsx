import { useState } from 'react';
import LogOutModal from '../../modals/LogOutModal/LogOutModal';
import UserSettingsModal from '../../modals/UserSettingsModal/UserSettingsModal';
//import Iconsvg from '../Icon/Icon';
import css from '../UserPanel/UserPanel.module.css';
import Iconsvg from '../Icon/Icon';
const UserBarPopover = () => {
  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);

  const openSettingModal = () => setIsSettingModalOpen(true);
  const closeSettingModal = () => setIsSettingModalOpen(false);

  const openLogOutModal = () => setIsLogOutModalOpen(true);
  const closeLogOutModal = () => setIsLogOutModalOpen(false);
  return (
    <div className={css.userPopoverContainer}>
      <button className={css.userPopoverBtn} onClick={openSettingModal}>
        <Iconsvg className={css.userPopoverBtnIcon} iconName={'settings'} />
        <span>Settings</span>
      </button>
      <button className={css.userPopoverBtn} onClick={openLogOutModal}>
        <Iconsvg className={css.userPopoverBtnIcon} iconName={'log-out'} />
        <span>Log out</span>
      </button>
      <UserSettingsModal
        isOpen={isSettingModalOpen}
        closeModal={closeSettingModal}
      />
      <LogOutModal isOpen={isLogOutModalOpen} closeModal={closeLogOutModal} />
    </div>
  );
};

export default UserBarPopover;
