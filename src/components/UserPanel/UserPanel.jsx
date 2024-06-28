//import { useEffect, useState } from 'react';
import { selectName } from '../../redux/users/selectors';
import UserBar from '../UserBar/UserBar';
import { useSelector } from 'react-redux';
// import { selectUser } from '../../redux/users/selectors.js';
//import UserMenu from '../UserMenu/UserMenu.jsx';

const UserPanel = () => {
  //const [userName, setUserName] = useState('User');
  //const [avatarUrl, setAvatarUrl] = useState(null);
  //const [svgPopover, setSvgPopover] = useState('chevron-down');
  const isSignedIn = true;
  const userData = useSelector(selectName);
  // useEffect(() => {
  //   if (userData) {
  //     userData.name;
  //     //     setAvatarUrl(userData.avatar || null);
  //   }
  // }, [userData]);

  return (
    <>
      {isSignedIn && (
        <h2>
          Hello, <span>{userData}</span>
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
