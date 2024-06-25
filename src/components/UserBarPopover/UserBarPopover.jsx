import { useEffect, useState } from 'react';
import LogOutModal from '../../modals/LogOutModal/LogOutModal';
import UserSettingsModal from '../../modals/UserSettingsModal/UserSettingsModal';
import Iconsvg from '../Icon/Icon';

const UserBarPopover = ({ userData }) => {
  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState('User');
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [svgPopover, setSvgPopover] = useState('chevron-down');

  useEffect(() => {
    if (userData) {
      setUserName(userData.name || 'User');
      setAvatarUrl(userData.avatar || null);
    }
  }, [userData]);

  const openSettingModal = () => setIsSettingModalOpen(true);
  const closeSettingModal = () => setIsSettingModalOpen(false);

  const openLogOutModal = () => setIsLogOutModalOpen(true);
  const closeLogOutModal = () => setIsLogOutModalOpen(false);

  const toggleMenu = () => {
    if (isOpen) {
      setSvgPopover('chevron-down');
      setIsOpen(!isOpen);
    } else {
      setSvgPopover('chevron-up');
      setIsOpen(!isOpen);
    }
  };
  return (
    <div>
      <button onClick={toggleMenu}>
        <span>{userName}</span>
        <img name={userName} src={avatarUrl} size="40" />
        <Iconsvg width="14" height="14" iconName={svgPopover} />
      </button>
      {isOpen && (
        <div>
          <button onClick={openSettingModal}>Settings</button>
          <button onClick={openLogOutModal}>Log out</button>
          <UserSettingsModal
            isOpen={isSettingModalOpen}
            closeModal={closeSettingModal}
          />
          <LogOutModal
            isOpen={isLogOutModalOpen}
            closeModal={closeLogOutModal}
          />
        </div>
      )}
    </div>
  );
};

export default UserBarPopover;
