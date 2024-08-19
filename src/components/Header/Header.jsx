import { useTranslation } from 'react-i18next';
import { useTour } from '@reactour/tour';

import css from './Header.module.css';
import styles from '../../modals/Modal/Modal.module.css';
import DeveloperModal from '../../modals/DeveloperModal/DeveloperModal';
import { useAuth } from '../../hooks/useAuth';
import { useModalContext } from '../../context/useModalContext';

const Header = () => {
  const { t } = useTranslation();
  const { openModal } = useModalContext();
  const { i18n } = useTranslation();
  const { setIsOpen } = useTour();
  const { isLoggedIn } = useAuth();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  return (
    <header>
      <div className={css.headerContainer}>
        <button
          type="button"
          className={`${css.languages} ${
            i18n.language === 'en' ? css.activeLanguage : ''
          }`}
          onClick={() => changeLanguage('en')}
        >
          {t('header.en')}
        </button>
        <button
          type="button"
          className={`${css.languages} ${
            i18n.language === 'uk' ? css.activeLanguage : ''
          }`}
          onClick={() => changeLanguage('uk')}
        >
          {t('header.ua')}
        </button>
        {isLoggedIn && (
          <button
            className={`first-step ${css.tour}`}
            onClick={() => setIsOpen(true)}
          >
            {t('header.guide')}
          </button>
        )}
        <button
          type="button"
          className={css.developers}
          onClick={() => {
            openModal(<DeveloperModal />, {
              modalClassName: styles.devModal,
              overlayClassName: styles.devOverlay,
            });
          }}
        >
          {t('header.devs')}
        </button>
      </div>
    </header>
  );
};

export default Header;
