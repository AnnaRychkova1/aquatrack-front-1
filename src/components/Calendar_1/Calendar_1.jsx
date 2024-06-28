import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectDate } from '../../redux/date/selectors';
import { fetchMonthlyWater } from '../../redux/water/operations';
import { paginationDate } from '../../redux/date/selectors';
import { selectToken } from '../../redux/users/selectors';
import { selectMonth } from '../../redux/water/selectors';
import CalendarItem_1 from '../CalendarItem_1/CalendarItem_1';

import css from './Calendar_1.module.css';
const Calendar_1 = () => {
  const storePaginationDate = new Date(useSelector(paginationDate));
  const storePaginationYear = storePaginationDate.getFullYear();
  const storePaginationMonth = storePaginationDate.getMonth();

  // Визначаємо початок та кінець місяця
  const startOfMonth = new Date(storePaginationYear, storePaginationMonth, 1);
  const endOfMonth = new Date(
    storePaginationYear,
    storePaginationMonth + 1,
    0,
    23,
    59,
    59,
    999
  );
  // Отримуємо дату зі стору
  const storeDate = new Date(useSelector(selectDate));
  // Отримуємо місяця (місяці у JavaScript рахуються з 0, тому додаємо 1)
  const month = (storeDate.getMonth() + 1).toString().padStart(2, '0');

  // Отримуємо року
  const year = storeDate.getFullYear();

  // Отримуємо дані з БД
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  useEffect(() => {
    if (token) {
      dispatch(fetchMonthlyWater({ month, year, token }));
    }
  }, [dispatch, month, year, token]);

  // Отримуємо зі стору
  const waterPortions = useSelector(selectMonth);

  return (
    <ul className={css.list}>
      {/* {waterPortions.length === 0 ? (
        <li className={css.emptyItem}>
          There is no data for the selected month
        </li>
      ) : (
        waterPortions.map(day => (
          <li className={css.item} key={day.data}>
            <CalendarItem_1 day={day.data} percent={day.percent} />
          </li>
        ))
      )} */}
    </ul>
  );
};

export default Calendar_1;
