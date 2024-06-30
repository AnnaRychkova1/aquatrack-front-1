import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsLoading,
  // selectIsVerified,
  // selectToken,
} from '../../redux/users/selectors';
import { selectLoading } from '../../redux/water/selectors';
import Loader from '../../components/Loader/Loader';
import css from './Tracker.module.css';
import { getCurrentUser } from '../../redux/users/operations';

const Tracker = () => {
  const loading = useSelector(selectIsLoading);
  const loadingWater = useSelector(selectLoading);
  // const isVerified = useSelector(selectIsVerified);

  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  console.log('i find user', user);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  if (!user) {
    return <div>Loading...</div>;
  }

  // console.log('I am verified?', isVerified);
  // console.log('i am current user');

  // selectUser? need to change?
  return (
    <>
      {loading && <Loader />}
      {loadingWater && <Loader />}
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
