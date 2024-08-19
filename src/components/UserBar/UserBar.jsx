import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import css from '../UserBar/UserBar.module.css';
import Iconsvg from '../../shared/components/Icon/Icon';
import UserBarPopover from '../UserBarPopover/UserBarPopover';
import { selectAvatar, selectName } from '../../redux/users/selectors';

const UserBar = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [svgPopover, setSvgPopover] = useState('chevron-down');
  const userDataName = useSelector(selectName);
  const userDataAvatar = useSelector(selectAvatar);
  const popoverRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = event => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        closePopover();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={css.containerPanel}>
      <div className="reactour__userPanelInfo">
        <div className={css.userPanel}>
          <span className={css.userNameSmall}>{userDataName}</span>
          <img name={userDataName} src={`${userDataAvatar}`} />
          <button className={css.userPanelBtn} onClick={togglePopover}>
            <Iconsvg className={css.userPanelBtnIcon} iconName={svgPopover} />
          </button>
          {isPopoverOpen && (
            <UserBarPopover ref={popoverRef} closePopover={closePopover} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserBar;
