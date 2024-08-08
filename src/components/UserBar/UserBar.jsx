//import { useEffect, useState } from 'react';
import { useState } from 'react';
import Iconsvg from '../../shared/components/Icon/Icon';
import UserBarPopover from '../UserBarPopover/UserBarPopover';
import { useSelector } from 'react-redux';
import { selectAvatar, selectName } from '../../redux/users/selectors';
import css from '../UserBar/UserBar.module.css';

const UserBar = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [svgPopover, setSvgPopover] = useState('chevron-down');
  const userDataName = useSelector(selectName);
  const userDataAvatar = useSelector(selectAvatar);

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
    <>
      <div className="reactour__userPanelInfo">
        <div className={css.userPanel}>
          <span className={css.userNameSmall}>{userDataName}</span>
          <img name={userDataName} src={`${userDataAvatar}`} />
          <button className={css.userPanelBtn} onClick={togglePopover}>
            <Iconsvg className={css.userPanelBtnIcon} iconName={svgPopover} />
          </button>
          {isPopoverOpen && <UserBarPopover closePopover={closePopover} />}
        </div>
      </div>
    </>
  );
};

export default UserBar;
