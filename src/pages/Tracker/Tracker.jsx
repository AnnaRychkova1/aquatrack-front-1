import { Helmet } from 'react-helmet-async';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../../redux/users/selectors';
import Loader from '../../components/Loader/Loader';
import css from './Tracker.module.css';

const Tracker = () => {
  const loading = useSelector(selectIsLoading);
  return (
    <>
      {loading && <Loader />}
      <div className={css.trackContainer}>
        <Helmet>
          <title>Tracker</title>
        </Helmet>

        <WaterMainInfo />
        <WaterDetailedInfo />
      </div>
    </>
  );
};

export default Tracker;
