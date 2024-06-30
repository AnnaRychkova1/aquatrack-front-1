//import { useEffect, useState } from 'react';
import { useEffect, useRef, useState } from 'react';
import Iconsvg from '../Icon/Icon';
import UserBarPopover from '../UserBarPopover/UserBarPopover';
import { useSelector } from 'react-redux';
import { selectAvatar, selectName } from '../../redux/users/selectors';
import css from '../UserPanel/UserPanel.module.css';
const UserBar = ({ userData, closeModal }) => {
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
    //closeModal();
  };
  const userDataName = useSelector(selectName);
  const userDataAvatar = useSelector(selectAvatar);
  // const settingsRef = useRef(null);
  // useEffect(() => {
  //   const handleClickOutside = event => {
  //     if (settingsRef.current && !settingsRef.current.contains(event.target)) {
  //       setIsOpen(false);
  //       setSvgPopover('chevron-down');
  //       closeModal();
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [settingsRef, closeModal]);

  // useEffect(() => {
  //   const handleEscape = event => {
  //     if (event.key === 'Escape') {
  //       setIsOpen(false);
  //       setSvgPopover('chevron-down');
  //       closeModal();
  //     }
  //   };

  //   if (isOpen) {
  //     document.addEventListener('keydown', handleEscape);
  //   } else {
  //     document.removeEventListener('keydown', handleEscape);
  //   }

  //   return () => {
  //     document.removeEventListener('keydown', handleEscape);
  //   };
  // }, [isOpen, closeModal]);

  return (
    <div className={css.userPanelContainerBtn}>
      <button className={css.userPanelBtn} onClick={toggleMenu}>
        <span>{userDataName}</span>
        <img
          name={userDataName}
          src={`http://localhost:3000/${userDataAvatar}`}
          size="40"
        />
        <Iconsvg className={css.userPanelBtnIcon} iconName={svgPopover} />
      </button>
      {isOpen && <UserBarPopover />}
    </div>
  );
};

export default UserBar;
