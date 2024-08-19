import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import Page from '../shared/style/Page/Page';
import Forgot from '../components/Forgot/Forgot';
import AdvantagesSection from '../components/AdvantagesSection/AdvantagesSection';
import { useMedia } from '../hooks/useMedia';

const ForgotPage = () => {
  const { t } = useTranslation();
  const { isDesktop } = useMedia();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const operationType = queryParams.get('operationType');

  return (
    <Page>
      <Helmet>
        <title>{t('pages.forgot')}</title>
      </Helmet>
      <Forgot operationType={operationType} />
      {isDesktop && <AdvantagesSection />}
    </Page>
  );
};

export default ForgotPage;
