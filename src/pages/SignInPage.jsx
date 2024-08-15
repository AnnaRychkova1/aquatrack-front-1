import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Page from '../shared/style/Page/Page';
import SignIn from '../components/SignIn/SignIn';
import Loader from '../shared/components/Loader/Loader';
import ErrorPage from './ErrorPage';
import AdvantagesSection from '../components/AdvantagesSection/AdvantagesSection';
import { selectIsError, selectIsLoading } from '../redux/users/selectors';
import { useMedia } from '../hooks/useMedia';

const SignInPage = () => {
  const { t } = useTranslation();
  const { isDesktop } = useMedia();
  const loading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  if (loading) {
    return <Loader />;
  }
  if (isError) {
    return <ErrorPage />;
  }
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
