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
import CalendarItem_1 from '../CalendarItem_1/CalendarItem_1';
import css from './Calendar_1.module.css';
import { useTranslation } from 'react-i18next';

const Calendar_1 = () => {
  const { t } = useTranslation();
  // Отримуємо дату зі стору
  const storePaginationDate = new Date(useSelector(paginationDate));
  //storePaginationDate  Sat Jun 29 2024 09:42:33 GMT+0300 (Восточная Европа, летнее время)

  // Отримуємо денну норму зі стору
  const waterDrinkNorma = useSelector(selectWaterDrink);

  // Готуємо дані для формування запиту
  const month = getMonth(storePaginationDate) + 1;
  const year = getYear(storePaginationDate);

  // Відсилаємо запит на отримання даних за місяць з БД
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  useEffect(() => {
    if (token) {
      dispatch(fetchMonthlyWater({ month, year, token }));
    }
  }, [dispatch, month, year, token]);

  // Отримуємо масив даних зі стору
  const waterPortions = useSelector(selectMonth); //date: '2024-05-22T00:00:00.000Z'

  // Отримуємо масив дат по вибраному місяцю (Mon Apr 01 2024 00:00:00 GMT+0300 (Восточная Европа, летнее время))
  const getDatesArray = () => {
    const start = startOfMonth(storePaginationDate);
    const end = endOfMonth(storePaginationDate);
    const days = eachDayOfInterval({ start, end });
    return days;
  };

  // Функція для обчислення %
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
          //  date   Fri Jun 21 2024 00:00:00 GMT+0300 (Восточная Европа, летнее время)
          const volumePerDay = waterPortions.reduce((totalVolume, arrDate) => {
            return isSameDay(arrDate.date, date)
              ? totalVolume + arrDate.volume
              : totalVolume;
          }, 0);
          return (
            <li className={css.item} key={date.toISOString()}>
              <CalendarItem_1 date={date} percent={percent(volumePerDay)} />
            </li>
          );
        })
      )}
    </ul>
  );
};

export default Calendar_1;

// toLocaleString();
