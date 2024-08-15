import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Page from '../../shared/components/Page/Page';
import RenewPassword from '../../components/RenewPassword/RenewPassword';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import Loader from '../shared/components/Loader/Loader';
import ErrorPage from './ErrorPage';
import { selectIsError, selectIsLoading } from '../redux/users/selectors';
import { useMedia } from '../../hooks/useMedia';

const RenewPasswordPage = () => {
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
        <title>{t('pages.renew')}</title>
      </Helmet>
      <RenewPassword />
      {isDesktop && <AdvantagesSection />}
    </Page>
  );
};

export default RenewPasswordPage;
