import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import css from './WaterList.module.css';
import WaterItem from '../WaterItem/WaterItem';
import Loader from '../../shared/components/Loader/Loader';
import { fetchDailyWater } from '../../redux/water/operations';
import { selectToken } from '../../redux/users/selectors';
import {
  selectLoadingWater,
  selectWaterPortion,
} from '../../redux/water/selectors';
import { changeTotalDay } from '../../redux/water/slice';

const WaterList = ({ selectDay }) => {
  const { t } = useTranslation();
  const loadingWater = useSelector(selectLoadingWater);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const waterPortions = useSelector(selectWaterPortion);

  const formatDate = useMemo(() => {
    const initDate = new Date(selectDay);
    const year = initDate.getFullYear();
    const month = String(initDate.getMonth() + 1).padStart(2, '0');
    const day = String(initDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }, [selectDay]);

  const sortedWaterPortions = useMemo(() => {
    return [...waterPortions].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
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
