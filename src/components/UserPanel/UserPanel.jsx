import { useEffect, useState } from 'react';
import UserBar from '../UserBar/UserBar';
//import UserMenu from '../UserMenu/UserMenu.jsx';

const UserPanel = ({ userData }) => {
  const [userName, setUserName] = useState('User');
  //const [avatarUrl, setAvatarUrl] = useState(null);
  //const [svgPopover, setSvgPopover] = useState('chevron-down');
  const isSignedIn = true;
  useEffect(() => {
    if (userData) {
      setUserName(userData.name || 'User');
      //     setAvatarUrl(userData.avatar || null);
    }
  }, [userData]);
  return (
    <>
      {isSignedIn && (
        <h2>
          Hello, <span>{userName}</span>
        </h2>
      )}
      {/* <UserMenu /> */}
      {/* UserMenu треба прибрати, нема такого компонента */}
      {/* <h2></h2> */}
      <UserBar />
    </>
  );
};

export default UserPanel;
