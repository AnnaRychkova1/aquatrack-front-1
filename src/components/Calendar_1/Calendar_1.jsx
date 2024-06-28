import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectWaterDrink } from '../../redux/users/selectors';
import { fetchMonthlyWater } from '../../redux/water/operations';
import { paginationDate } from '../../redux/date/selectors';
import { selectToken } from '../../redux/users/selectors';
import { selectMonth } from '../../redux/water/selectors';
import CalendarItem_1 from '../CalendarItem_1/CalendarItem_1';
import css from './Calendar_1.module.css';

// Функція для визначення дати з dateTime у форматі 'YYYY-MM-DD'
const extractDate = dateTime => {
  return dateTime.split('T')[0];
};

// Функція для створення масиву з 1 по останній день місяця
function getDatesArray(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth();

  // Get the last day of the month
  const lastDay = new Date(year, month + 1, 0).getDate();

  const datesArray = [];
  for (let day = 1; day <= lastDay; day++) {
    const currentDate = new Date(year, month, day);
    datesArray.push(currentDate.toISOString());
  }

  return datesArray;
}

const Calendar_1 = () => {
  // Отримуємо дату зі стору
  const storePaginationDate = new Date(useSelector(paginationDate));
  const waterDrinkNorma = useSelector(selectWaterDrink);

  // Отримуємо число місяця (місяці у JavaScript рахуються з 0, тому додаємо 1)
  const month = (storePaginationDate.getMonth() + 1)
    .toString()
    .padStart(2, '0');
  // Отримуємо рік
  const year = storePaginationDate.getFullYear();

  // Отримуємо дані з БД
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  useEffect(() => {
    if (token) {
      dispatch(fetchMonthlyWater({ month, year, token }));
    }
  }, [dispatch, month, year, token]);

  // Отримуємо масив даних зі стору
  const waterPortions = useSelector(selectMonth);

  // Отримуємо масив дат по вибраному місяцю
  const dateArray = getDatesArray(storePaginationDate);

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
      {dateArray.length === 0 ? (
        <li className={css.emptyItem}>
          There is no data for the selected month
        </li>
      ) : (
        dateArray.map(date => {
          const totalVolume = waterPortions.reduce((sum, item) => {
            return extractDate(item.date) === extractDate(date)
              ? sum + item.volume
              : sum;
          }, 0);
          return (
            <li className={css.item} key={date}>
              <CalendarItem_1 date={date} percent={percent(totalVolume)} />
            </li>
          );
        })
      )}
    </ul>
  );
};

export default Calendar_1;
