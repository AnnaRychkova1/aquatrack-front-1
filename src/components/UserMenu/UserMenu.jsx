import { useEffect, useState } from 'react';
//import UserMenuModal from './UserMenuModals/Modal';
//import Iconsvg from '../Icon/Icon';
//import UserBar from '../UserBar/UserBar';
// import LogOutModal from '../../modals/LogOutModal/LogOutModal.jsx';
// import UserSettingsModal from '../../modals/UserSettingsModal/UserSettingsModal.jsx';
const UserMenu = ({ userData }) => {
  //const [isOpen, setIsOpen] = useState(false);
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
  // const toggleMenu = () => {
  //   if (isOpen) {
  //     setSvgPopover('chevron-down');
  //     setIsOpen(!isOpen);
  //   } else {
  //     setSvgPopover('chevron-up');
  //     setIsOpen(!isOpen);
  //   }
  // };

  return (
    <>
      {isSignedIn && (
        <div>
          <h2>
            Hello, <span>{userName}</span>
          </h2>
          {/* <div>
            <button onClick={toggleMenu}>
              <span>{userName}</span>
              <img name={userName} src={avatarUrl} size="40" />
              <Iconsvg width="14" height="14" iconName={svgPopover} />
            </button>
            {isOpen && (
              <div> */}
          {/* <UserMenuModal word={"settings"}>
                <button onClick={openSettingModal}>Settings</button> 
                 </UserMenuModal>
                <UserMenuModal word={"Log out"}>
                <button onClick={openLogOutModal}>Log out</button>
                </UserMenuModal> */}

          {/* <UserMenuModal word={'settings'}>
                  <button>Settings</button>
                </UserMenuModal>
                <UserMenuModal word={'Log out'}>
                  <button>Log out</button>
                </UserMenuModal>
                {/* <UserBar /> */}
          {/* </div> */}
          {/* )} */}
          {/* </div> */}
        </div>
      )}
      {/* <UserSettingsModal
        isOpen={isSettingModalOpen}
        closeModal={closeSettingModal}
      />
      <LogOutModal isOpen={isLogOutModalOpen} closeModal={closeLogOutModal} /> */}
    </>
  );
};

export default UserMenu;
