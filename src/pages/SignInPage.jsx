import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import Page from '../shared/style/Page/Page';
import SignIn from '../components/SignIn/SignIn';
import AdvantagesSection from '../components/AdvantagesSection/AdvantagesSection';
import { useMedia } from '../hooks/useMedia';

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
