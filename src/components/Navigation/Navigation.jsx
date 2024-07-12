import { Link } from 'react-router-dom';

import css from './Navigation.module.css';
import { useTranslation } from 'react-i18next';

export const Navigation = () => {
  const { t } = useTranslation();
  return (
    <nav className={css.welcomeButton_block}>
      <Link to="/signup" className={css.welcomeButton_tracker}>
        {t('welcomeSection.try')}
      </Link>
      <Link to="/signin" className={css.welcomeButton_sign}>
        {t('welcomeSection.signin')}
      </Link>
    </nav>
  );
};
