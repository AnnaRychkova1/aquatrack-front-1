import { useDispatch, useSelector } from 'react-redux';
// import { isSameDay } from 'date-fns';
import { useEffect } from 'react';
import { fetchDailyWater } from '../../redux/water/operations';
import { selectToken } from '../../redux/users/selectors';
import { selectWaterPortion } from '../../redux/water/selectors';
import { changeTotalDay } from '../../redux/water/slice';
import WaterItem from '../WaterItem/WaterItem';
import css from './WaterList.module.css';
import { useTranslation } from 'react-i18next';

const WaterList = ({ selectDay }) => {
  const { t } = useTranslation();
  const initDate = new Date(selectDay);
  const year = initDate.getFullYear();
  const month = String(initDate.getMonth() + 1).padStart(2, '0');
  const day = String(initDate.getDate()).padStart(2, '0');

  const formatDate = `${year}-${month}-${day}`;

  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token) {
      dispatch(fetchDailyWater({ date: formatDate, token }));
    }
  }, [dispatch, token, formatDate]);

  const waterPortions = useSelector(selectWaterPortion);

  const sortedWaterPortions = [...waterPortions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  useEffect(() => {
    const totalVolume = sortedWaterPortions.reduce((sum, item) => {
      return sum + item.volume;
    }, 0);
    dispatch(changeTotalDay(totalVolume));
  }, [dispatch, sortedWaterPortions]);

  return (
    <div className="reactour__waterCardList">
      <ul className={css.list}>
        {sortedWaterPortions.length === 0 ? (
          <li className={css.emptyItem}>{t('trackerPage.noWater')}</li>
        ) : (
          sortedWaterPortions.map((waterItem, index) => (
            <li className={css.item} key={`${waterItem._id}-${index}`}>
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
