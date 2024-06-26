import { useEffect, useState } from 'react';
import Iconsvg from '../Icon/Icon';
import UserBarPopover from '../UserBarPopover/UserBarPopover';

const UserBar = ({ userData }) => {
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
      {isOpen && <UserBarPopover />}
    </div>
  );
};

export default UserBar;
