import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import Page from '../shared/style/Page/Page';
import AdvantagesSection from '../components/AdvantagesSection/AdvantagesSection';
import WelcomeSection from '../components/WelcomeSection/WelcomeSection';

const HomePage = () => {
  const { t } = useTranslation();
  return (
    <Page>
      <Helmet>
        <title>{t('pages.home')}</title>
      </Helmet>
      <WelcomeSection />
      <AdvantagesSection />
    </Page>
  );
};

export default HomePage;
