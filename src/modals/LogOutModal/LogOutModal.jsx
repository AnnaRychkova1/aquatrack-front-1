import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import css from './LogOutModal.module.css';
import { logOut } from '../../redux/users/operations';
import { useModalContext } from '../../context/useModalContext';

const LogOutModal = ({ closePopover }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { closeModal } = useModalContext();

  const onLogOut = () => {
    dispatch(logOut());
    closeModal();
    closePopover();
  };
  const handleClose = () => {
    closePopover();
    closeModal();
  };

  return (
    <div className={css.logOutModal}>
      <p className={css.title}>{t('modals.logout')}</p>

      <p className={css.subtitle}>{t('modals.leave')}?</p>
      <div className={css.boxButton}>
        <button className={css.buttonLogOut} type="button" onClick={onLogOut}>
          {t('modals.logout')}
        </button>

        <button
          className={css.buttonCancel}
          type="button"
          onClick={handleClose}
        >
          {t('modals.cancel')}
        </button>
      </div>
    </div>
  );
};

export default LogOutModal;
