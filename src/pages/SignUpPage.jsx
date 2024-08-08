import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { useMedia } from '../hooks/useMedia';
import Page from '../shared/style/Page/Page';
import SignUp from '../components/SignUp/SignUp';
import AdvantagesSection from '../components/AdvantagesSection/AdvantagesSection';

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
