import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import Page from '../shared/style/Page/Page';
import SignUp from '../components/SignUp/SignUp';
import AdvantagesSection from '../components/AdvantagesSection/AdvantagesSection';
import { useMedia } from '../hooks/useMedia';

const SignUpPage = () => {
  const { t } = useTranslation();
  const { isDesktop } = useMedia();

  return (
    <Page>
      <Helmet>
        <title>{t('pages.signup')}</title>
      </Helmet>
      <SignUp />
      {isDesktop && <AdvantagesSection />}
    </Page>
  );
};

export default SignUpPage;
