//import { useEffect, useState } from 'react';
import { useState } from 'react';
import Iconsvg from '../Icon/Icon';
import UserBarPopover from '../UserBarPopover/UserBarPopover';
import { useSelector } from 'react-redux';
import {
  selectAvatar,
  selectIsSignedIn,
  selectName,
} from '../../redux/users/selectors';
import css from '../UserPanel/UserPanel.module.css';

const UserBar = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [svgPopover, setSvgPopover] = useState('chevron-down');
  const userDataName = useSelector(selectName);
  const userDataAvatar = useSelector(selectAvatar);
  const isSignedIn = useSelector(selectIsSignedIn);

  const togglePopover = () => {
    setIsPopoverOpen(prevState => !prevState);
    setSvgPopover(prevState =>
      prevState === 'chevron-down' ? 'chevron-up' : 'chevron-down'
    );
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
    setSvgPopover('chevron-down');
  };

  return (
    <div className={css.userPanelContainerBtn}>
      <div className="reactour__userPanelInfo">
        <button className={css.userPanelBtn} onClick={togglePopover}>
          {isSignedIn ? (
            <span className={css.userNameSmall}>{userDataName}</span>
          ) : (
            <span className={css.userNameSmall}>User</span>
          )}
          <img name={userDataName} src={`${userDataAvatar}`} size="40" />
          <Iconsvg className={css.userPanelBtnIcon} iconName={svgPopover} />
        </button>
      </div>
      {isPopoverOpen && <UserBarPopover closePopover={closePopover} />}
    </div>
  );
};

export default UserBar;
