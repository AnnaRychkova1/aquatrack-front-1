//import { useEffect, useState } from 'react';
import { selectIsVerified, selectName } from '../../redux/users/selectors';
import UserBar from '../UserBar/UserBar';
import { useSelector } from 'react-redux';
import css from './UserPanel.module.css';
// import { selectUser } from '../../redux/users/selectors.js';
//import UserMenu from '../UserMenu/UserMenu.jsx';

const UserPanel = () => {
  //const [userName, setUserName] = useState('User');
  //const [avatarUrl, setAvatarUrl] = useState(null);
  //const [svgPopover, setSvgPopover] = useState('chevron-down');
  const isSignedIn = useSelector(selectIsVerified);
  const userData = useSelector(selectName);
  // useEffect(() => {
  //   if (userData) {
  //     userData.name;
  //     //     setAvatarUrl(userData.avatar || null);
  //   }
  // }, [userData]);

  return (
    <div className={css.userPanelContainer}>
      {isSignedIn && (
        <h2 className={css.userPanelTitle}>
          Hello, <span>{userData}!</span>
        </h2>
      )}
      {/* <UserMenu /> */}
      {/* UserMenu треба прибрати, нема такого компонента */}
      {/* <h2></h2> */}
      <UserBar />
    </div>
  );
};

export default UserPanel;
