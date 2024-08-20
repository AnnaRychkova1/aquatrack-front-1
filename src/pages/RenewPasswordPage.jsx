import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import Page from '../shared/style/Page/Page';
import RenewPassword from '../components/RenewPassword/RenewPassword';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import { useMedia } from '../../hooks/useMedia';

const RenewPasswordPage = () => {
  const { t } = useTranslation();
  const { isDesktop } = useMedia();

  return (
    <Page>
      <Helmet>
        <title>{t('pages.renew')}</title>
      </Helmet>
      <RenewPassword />
      {isDesktop && <AdvantagesSection />}
    </Page>
  );
};

export default RenewPasswordPage;
