import { selectName } from '../../redux/users/selectors';
import UserBar from '../UserBar/UserBar';
import { useSelector } from 'react-redux';
import css from './UserPanel.module.css';
import { useTranslation } from 'react-i18next';

const UserPanel = () => {
  const { t } = useTranslation();
  const userData = useSelector(selectName);

  return (
    <div className="reactour__userPanelBtn">
      <div className={css.userPanelContainer}>
        <h2 className={css.userPanelTitle}>
          {t('trackerPage.greeting')}
          <span className={css.userName}>, {userData}!</span>
        </h2>
        <UserBar />
      </div>
    </div>
  );
};

export default UserPanel;
