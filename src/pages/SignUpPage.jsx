import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Page from '../shared/style/Page/Page';
import SignUp from '../components/SignUp/SignUp';
import AdvantagesSection from '../components/AdvantagesSection/AdvantagesSection';
import ErrorPage from './ErrorPage';
import Loader from '../shared/components/Loader/Loader';
import { selectIsError, selectIsLoading } from '../redux/users/selectors';
import { useMedia } from '../hooks/useMedia';

const SignUpPage = () => {
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
        <title>{t('pages.signup')}</title>
      </Helmet>
      <SignUp />
      {isDesktop && <AdvantagesSection />}
    </Page>
  );
};

export default SignUpPage;
