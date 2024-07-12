import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../../redux/users/selectors';
import { logOut } from '../../redux/users/operations';
import css from './LogOutModal.module.css';
import { useTranslation } from 'react-i18next';

const UserLogOut = ({ closeModal }) => {
  const { t } = useTranslation();
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const onLogOut = () => {
    dispatch(logOut(token));

    closeModal();
  };
  return (
    <div className={css.LogOutModal}>
      <p className={css.title}>{t('modals.logout')}</p>

      <p className={css.subtitle}>{t('modals.leave')}?</p>
      <div className={css.boxButton}>
        <button className={css.buttonLogOut} type="button" onClick={onLogOut}>
          {t('modals.logout')}
        </button>

        <button className={css.buttonCancel} type="button" onClick={closeModal}>
          {t('modals.cancel')}
        </button>
      </div>
    </div>
  );
};

export default UserLogOut;
