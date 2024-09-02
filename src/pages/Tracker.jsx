import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Page from '../shared/style/Page/Page';
import Loader from '../shared/components/Loader/Loader';
import WaterMainInfo from '../components/WaterMainInfo/WaterMainInfo';
import WaterDetailedInfo from '../components/WaterDetailedInfo/WaterDetailedInfo';
import { selectIsLoading } from '../redux/users/selectors';

const Tracker = () => {
  const { t } = useTranslation();
  const loading = useSelector(selectIsLoading);

  if (loading) {
    return <Loader />;
  }

  return (
    <Page>
      <Helmet>
        <title>{t('pages.tracker')}</title>
      </Helmet>
      <WaterMainInfo />
      <WaterDetailedInfo />
    </Page>
  );
};

export default Tracker;
