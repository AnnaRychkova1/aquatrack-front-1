import { Helmet } from 'react-helmet-async';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import css from './HomePage.module.css';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation();
  return (
    <div className={css.generalHomePage}>
      <Helmet>
        <title>{t('pages.home')}</title>
      </Helmet>
      <WelcomeSection />
      <AdvantagesSection />
    </div>
  );
};

export default HomePage;
