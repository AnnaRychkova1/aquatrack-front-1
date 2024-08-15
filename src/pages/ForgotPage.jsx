import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Page from '../shared/style/Page/Page';
import Forgot from '../components/Forgot/Forgot';
import AdvantagesSection from '../components/AdvantagesSection/AdvantagesSection';
import Loader from '../shared/components/Loader/Loader';
import ErrorPage from './ErrorPage';
import { useMedia } from '../hooks/useMedia';
import { selectIsError, selectIsLoading } from '../redux/users/selectors';

const ForgotPage = () => {
  const { t } = useTranslation();
  const { isDesktop } = useMedia();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const operationType = queryParams.get('operationType');
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
        <title>{t('pages.forgot')}</title>
      </Helmet>
      <Forgot operationType={operationType} />
      {isDesktop && <AdvantagesSection />}
    </Page>
  );
};

export default ForgotPage;
