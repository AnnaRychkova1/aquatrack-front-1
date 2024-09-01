import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  getMonth,
  getYear,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from 'date-fns';

import css from './Calendar.module.css';
import CalendarItem from '../CalendarItem/CalendarItem';
import Loader from '../../shared/components/Loader/Loader';
import { selectWaterDrink } from '../../redux/users/selectors';
import { fetchMonthlyWater } from '../../redux/water/operations';
import { paginationDate } from '../../redux/date/selectors';
import { selectToken } from '../../redux/users/selectors';
import {
  selectErrorWater,
  selectLoadingWater,
  selectMonth,
} from '../../redux/water/selectors';
import ErrorPage from '../../pages/ErrorPage';

const Calendar = () => {
  const { t } = useTranslation();
  const storePaginationDate = useSelector(paginationDate);
  const waterDrinkNorma = useSelector(selectWaterDrink);
  const month = getMonth(storePaginationDate) + 1;
  const year = getYear(storePaginationDate);
  const loadingWater = useSelector(selectLoadingWater);
  const isErrorWater = useSelector(selectErrorWater);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const waterPortions = useSelector(selectMonth);

  const formatDate = useMemo(() => {
    const initDate = new Date(storePaginationDate);
    const year = initDate.getUTCFullYear();
    const month = String(initDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(initDate.getUTCDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }, [storePaginationDate]);

  const percent = volume => {
    if (volume) {
      return Math.round((volume / waterDrinkNorma) * 0.1);
    } else {
      return 0;
    }
  };

  const getDatesArray = () => {
    const start = startOfMonth(formatDate);
    const end = endOfMonth(formatDate);
    const days = eachDayOfInterval({ start, end });
    return days;
  };

  useEffect(() => {
    if (token) {
      dispatch(fetchMonthlyWater({ month, year, token }));
    }
  }, [dispatch, month, year, token]);

  if (loadingWater) {
    return <Loader />;
  }

  if (isErrorWater) {
    return <ErrorPage />;
  }

  return (
    <ul className={css.list}>
      {getDatesArray().length === 0 ? (
        <li className={css.emptyItem}>{t('trackerPage.noDataForMonth')}</li>
      ) : (
        getDatesArray().map(date => {
          const dateISO = new Date(
            date.getTime() - date.getTimezoneOffset() * 60000
          )
            .toISOString()
            .slice(0, 10);
          const volumePerDay = waterPortions.reduce((totalVolume, arrDate) => {
            const arrDateISO = new Date(arrDate.date)
              .toISOString()
              .slice(0, 10);
            return arrDateISO === dateISO
              ? totalVolume + arrDate.volume
              : totalVolume;
          }, 0);
          return (
            <li className={css.item} key={dateISO}>
              <CalendarItem date={dateISO} percent={percent(volumePerDay)} />
            </li>
          );
        })
      )}
    </ul>
  );
};

export default Calendar;
