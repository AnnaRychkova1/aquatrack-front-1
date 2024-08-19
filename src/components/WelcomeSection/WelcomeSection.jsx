import { useTranslation } from 'react-i18next';
import css from './WelcomeSection.module.css';
import Logo from '../../shared/components/Logo/Logo';
import { Navigation } from '../Navigation/Navigation';

const WelcomeSection = () => {
  const { t } = useTranslation();
  return (
    <section className={css.welcomeBox}>
      <Logo />
      <div>
        <p className={css.welcomePhrase}>{t('welcomeSection.recordDaily')}</p>
        <h1 className={css.welcomeName}>{t('welcomeSection.waterTracker')}</h1>
        <Navigation />
      </div>
    </section>
  );
};

export default WelcomeSection;
