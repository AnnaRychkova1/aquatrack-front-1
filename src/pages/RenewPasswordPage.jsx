import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { useMedia } from '../../hooks/useMedia';
import Page from '../../shared/components/Page/Page';
import RenewPassword from '../../components/RenewPassword/RenewPassword';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';

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
