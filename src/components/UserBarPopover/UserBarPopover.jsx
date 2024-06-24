import { useState } from 'react';
import LogOutModal from '../../modals/LogOutModal/LogOutModal';
import UserSettingsModal from '../../modals/UserSettingsModal/UserSettingsModal';

const UserBarPopover = () => {
  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const openSettingModal = () => setIsSettingModalOpen(true);
  const closeSettingModal = () => setIsSettingModalOpen(false);

  const openLogOutModal = () => setIsLogOutModalOpen(true);
  const closeLogOutModal = () => setIsLogOutModalOpen(false);
  return (
    <div>
      <button onClick={openSettingModal}>Settings</button>
      <button onClick={openLogOutModal}>Log out</button>
      <UserSettingsModal
        isOpen={isSettingModalOpen}
        closeModal={closeSettingModal}
      />
      <LogOutModal isOpen={isLogOutModalOpen} closeModal={closeLogOutModal} />
    </div>
  );
};

export default UserBarPopover;
