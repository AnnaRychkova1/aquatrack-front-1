import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import css from './WaterList.module.css';
import WaterItem from '../WaterItem/WaterItem';
import Loader from '../../shared/components/Loader/Loader';
import ErrorPage from '../../pages/ErrorPage';
import { fetchDailyWater } from '../../redux/water/operations';
import { selectToken } from '../../redux/users/selectors';
import {
  selectErrorWater,
  selectLoadingWater,
  selectWaterPortion,
} from '../../redux/water/selectors';
import { changeTotalDay } from '../../redux/water/slice';

const WaterList = ({ selectDay }) => {
  const { t } = useTranslation();
  const loadingWater = useSelector(selectLoadingWater);
  const isErrorWater = useSelector(selectErrorWater);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const waterPortions = useSelector(selectWaterPortion);

  const formatDate = useMemo(() => {
    const initDate = new Date(selectDay);
    const year = initDate.getUTCFullYear();
    const month = String(initDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(initDate.getUTCDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }, [selectDay]);

  const sortedWaterPortions = useMemo(() => {
    return [...waterPortions]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map(item => ({
        ...item,
        date: new Date(item.date).toLocaleString(),
      }));
  }, [waterPortions]);

  const totalVolume = useMemo(() => {
    return sortedWaterPortions.reduce((sum, item) => {
      return sum + item.volume;
    }, 0);
  }, [sortedWaterPortions]);

  useEffect(() => {
    if (token) {
      dispatch(fetchDailyWater({ date: formatDate, token }));
    }
  }, [dispatch, token, formatDate]);

  useEffect(() => {
    dispatch(changeTotalDay(totalVolume));
  }, [dispatch, totalVolume]);

  if (loadingWater) {
    return <Loader />;
  }

  if (isErrorWater) {
    return <ErrorPage />;
  }

  return (
    <div className="reactour__waterCardList">
      <ul className={css.list}>
        {sortedWaterPortions.length === 0 ? (
          <li className={css.emptyItem}>{t('trackerPage.noWater')}</li>
        ) : (
          sortedWaterPortions.map(waterItem => (
            <li className={css.item} key={waterItem._id}>
              <WaterItem
                id={waterItem._id}
                volume={waterItem.volume}
                date={waterItem.date}
                isEditable={true}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default WaterList;
