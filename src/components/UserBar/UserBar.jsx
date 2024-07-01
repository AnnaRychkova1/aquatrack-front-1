//import { useEffect, useState } from 'react';
import { useState } from 'react';
import Iconsvg from '../Icon/Icon';
import UserBarPopover from '../UserBarPopover/UserBarPopover';
import { useSelector } from 'react-redux';
import { selectAvatar, selectName } from '../../redux/users/selectors';
import css from '../UserPanel/UserPanel.module.css';

const UserBar = () => {
  // const userData = useSelector(selectName);
  const [isOpen, setIsOpen] = useState(false);
  const [svgPopover, setSvgPopover] = useState('chevron-down');
  const userDataName = useSelector(selectName);
  const userDataAvatar = useSelector(selectAvatar);

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
    <div className={css.userPanelContainerBtn}>
      <button className={css.userPanelBtn} onClick={toggleMenu}>
        <span>{userDataName}</span>
        <img name={userDataName} src={`${userDataAvatar}`} size="40" />
        <Iconsvg className={css.userPanelBtnIcon} iconName={svgPopover} />
      </button>
      {isOpen && <UserBarPopover />}
    </div>
  );
};

export default UserBar;
