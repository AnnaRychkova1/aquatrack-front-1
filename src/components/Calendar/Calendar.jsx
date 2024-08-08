import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  isSameDay,
  getMonth,
  getYear,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from 'date-fns';
import { selectWaterDrink } from '../../redux/users/selectors';
import { fetchMonthlyWater } from '../../redux/water/operations';
import { paginationDate } from '../../redux/date/selectors';
import { selectToken } from '../../redux/users/selectors';
import { selectMonth } from '../../redux/water/selectors';
import CalendarItem from '../CalendarItem/CalendarItem';
import css from './Calendar.module.css';
import { useTranslation } from 'react-i18next';

const Calendar = () => {
  const { t } = useTranslation();

  const storePaginationDate = new Date(useSelector(paginationDate));

  const waterDrinkNorma = useSelector(selectWaterDrink);

  const month = getMonth(storePaginationDate) + 1;
  const year = getYear(storePaginationDate);

  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  useEffect(() => {
    if (token) {
      dispatch(fetchMonthlyWater({ month, year, token }));
    }
  }, [dispatch, month, year, token]);

  const waterPortions = useSelector(selectMonth);

  const getDatesArray = () => {
    const start = startOfMonth(storePaginationDate);
    const end = endOfMonth(storePaginationDate);
    const days = eachDayOfInterval({ start, end });
    return days;
  };

  const percent = volume => {
    if (volume) {
      return Math.round((volume / waterDrinkNorma) * 0.1);
    } else {
      return 0;
    }
  };

  return (
    <ul className={css.list}>
      {getDatesArray().length === 0 ? (
        <li className={css.emptyItem}>{t('trackerPage.noDataForMonth')}</li>
      ) : (
        getDatesArray().map(date => {
          const volumePerDay = waterPortions.reduce((totalVolume, arrDate) => {
            return isSameDay(arrDate.date, date)
              ? totalVolume + arrDate.volume
              : totalVolume;
          }, 0);
          return (
            <li className={css.item} key={date.toISOString()}>
              <CalendarItem date={date} percent={percent(volumePerDay)} />
            </li>
          );
        })
      )}
    </ul>
  );
};

export default Calendar;
