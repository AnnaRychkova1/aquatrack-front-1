import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { selectIsLoading } from '../redux/users/selectors';
import { selectLoading } from '../redux/water/selectors';
import Page from '../shared/style/Page/Page';
import Loader from '../shared/components/Loader/Loader';
import WaterMainInfo from '../components/WaterMainInfo/WaterMainInfo';
import WaterDetailedInfo from '../components/WaterDetailedInfo/WaterDetailedInfo';

const Tracker = () => {
  const loading = useSelector(selectIsLoading);
  const loadingWater = useSelector(selectLoading);

  const { t } = useTranslation();
  return (
    <>
      {loading && <Loader />}
      {loadingWater && <Loader />}
      <Page>
        <Helmet>
          <title>{t('pages.tracker')}</title>
        </Helmet>
        <WaterMainInfo />
        <WaterDetailedInfo />
      </Page>
    </>
  );
};

export default Tracker;
