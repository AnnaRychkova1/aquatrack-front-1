import Logo from '../Logo/Logo';
import css from './WelcomeSection.module.css';
import { Navigation } from '../Navigation/Navigation';
import { useTranslation } from 'react-i18next';

const WelcomeSection = () => {
  const { t } = useTranslation();
  return (
    <div className={css.welcomeBox}>
      <Logo />
      <div>
        <p className={css.welcomePhrase}>{t('welcomeSection.recordDaily')}</p>
        <h1 className={css.welcomeName}>{t('welcomeSection.waterTracker')}</h1>
        <Navigation />
      </div>
    </div>
  );
};

export default WelcomeSection;
