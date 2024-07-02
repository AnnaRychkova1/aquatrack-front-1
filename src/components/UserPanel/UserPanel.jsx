import { selectIsSignedIn, selectName } from '../../redux/users/selectors';
import UserBar from '../UserBar/UserBar';
import { useSelector } from 'react-redux';
import css from './UserPanel.module.css';

const UserPanel = () => {
  const isSignedIn = useSelector(selectIsSignedIn);
  const userData = useSelector(selectName);

  return (
    <div className="reactour__userPanelBtn">
      <div className={css.userPanelContainer}>
        {isSignedIn && (
          <h2 className={css.userPanelTitle}>
            Hello, <span>{userData}!</span>
          </h2>
        )}

        <UserBar />
      </div>
    </div>
  );
};

export default UserPanel;
