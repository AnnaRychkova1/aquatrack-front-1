// export const UserMenu = () => {
//   //   const { isSignedIn } = useAuth();
//   const isSignedIn = false;
//   return (
//     <>
//       {isSignedIn && (
//         <div>
//           <p>Welcome!</p>
//           <button type="button">Setting</button>
//           <button type="button">Log out</button>
//         </div>
//       )}
//     </>
//   );
// };
import { useEffect, useState } from 'react';
// import LogOutModal from '../../modals/LogOutModal/LogOutModal.jsx';
// import UserSettingsModal from '../../modals/UserSettingsModal/UserSettingsModal.jsx';
const UserMenu = ({ userData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState('User');
  const [avatarUrl, setAvatarUrl] = useState(null);
  const isSignedIn = true;
  useEffect(() => {
    if (userData) {
      setUserName(userData.name || 'User');
      setAvatarUrl(userData.avatar || null);
    }
  }, [userData]);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isSignedIn && (
        <div>
          <h1>
            Hello, <span>{userName}</span>
          </h1>
          <div>
            <button onClick={toggleMenu}>
              <span>{userName}</span>
              <img name={userName} src={avatarUrl} size="40" />
            </button>
            {isOpen && (
              <div>
                {/* <UserMenuModal word={"settings"}> */}
                {/* <button onClick={openSettingModal}>Settings</button> */}
                {/* </UserMenuModal> */}
                {/* <UserMenuModal word={"Log out"}> */}
                {/* <button onClick={openLogOutModal}>Log out</button> */}
                {/* </UserMenuModal> */}
              </div>
            )}
          </div>
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
