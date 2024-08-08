import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { useMedia } from '../hooks/useMedia';
import Page from '../shared/style/Page/Page';
import ForgotPasswordForm from '../forms/ForgotForm';
import AdvantagesSection from '../components/AdvantagesSection/AdvantagesSection';
import { useLocation } from 'react-router-dom';

const ForgotPassword = () => {
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
      <ForgotPasswordForm operationType={operationType} />
      {isDesktop && <AdvantagesSection />}
    </Page>
  );
};

export default ForgotPassword;
