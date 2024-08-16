import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Page from '../shared/style/Page/Page';
import Loader from '../shared/components/Loader/Loader';
import WaterMainInfo from '../components/WaterMainInfo/WaterMainInfo';
import WaterDetailedInfo from '../components/WaterDetailedInfo/WaterDetailedInfo';
import ErrorPage from './ErrorPage';
import Notification from '../components/Notification/Notification';
import { selectErrorWater } from '../redux/water/selectors';
import { selectIsError, selectIsLoading } from '../redux/users/selectors';

const Tracker = () => {
  const { t } = useTranslation();
  const loading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const isErrorWater = useSelector(selectErrorWater);

  if (loading) {
    return <Loader />;
  }

  if (isError || isErrorWater) {
    return <ErrorPage />;
  }

  return (
    <Page>
      <Helmet>
        <title>{t('pages.tracker')}</title>
      </Helmet>
      <Notification type="success" message={`${t('trackerPage.welcome')}`} />
      <WaterMainInfo />
      <WaterDetailedInfo />
    </Page>
  );
};

export default Tracker;
