import UserBar from '../UserBar/UserBar';
import UserMenu from '../UserMenu/UserMenu.jsx';

const UserPanel = () => {
  return (
    <>
      <UserMenu />
      {/* UserMenu треба прибрати, нема такого компонента */}
      <h2></h2>
      <UserBar />
    </>
  );
};

export default UserPanel;
