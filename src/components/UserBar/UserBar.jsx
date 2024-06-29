import { useEffect, useState } from 'react';
import Iconsvg from '../Icon/Icon';
import UserBarPopover from '../UserBarPopover/UserBarPopover';
import { useSelector } from 'react-redux';
import { selectAvatar, selectName } from '../../redux/users/selectors';

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
  const userDataName = useSelector(selectName);
  const userDataAvatar = useSelector(selectAvatar);
  return (
    <div>
      <button onClick={toggleMenu}>
        <span>{userDataName}</span>
        <img
          name={userDataName}
          src={`http://localhost:3000/${userDataAvatar}`}
          size="40"
        />
        <Iconsvg width="14" height="14" iconName={svgPopover} />
      </button>
      {isOpen && <UserBarPopover />}
    </div>
  );
};

export default UserBar;
