import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { useMedia } from '../hooks/useMedia';
import Page from '../shared/style/Page/Page';
import SignIn from '../components/SignIn/SignIn';
import AdvantagesSection from '../components/AdvantagesSection/AdvantagesSection';

const SignInPage = () => {
  const { t } = useTranslation();
  const { isDesktop } = useMedia();
  return (
    <Page>
      <Helmet>
        <title>{t('pages.signin')}</title>
      </Helmet>
      <SignIn />
      {isDesktop && <AdvantagesSection />}
    </Page>
  );
};

export default SignInPage;
