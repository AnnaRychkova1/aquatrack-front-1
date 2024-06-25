import { useSelector } from 'react-redux';
import { paginationDate } from '../../redux/date/selectors';
import CalendarItem_1 from '../CalendarItem_1/CalendarItem_1';
import days from './days.json';
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

  // Фільтруємо масив days в діапазоні вибраного місяця
  const filteredDays = days.filter(day => {
    const date = new Date(day.data);
    return date >= startOfMonth && date <= endOfMonth;
  });

  return (
    <ul className={css.list}>
      {filteredDays.length === 0 ? (
        <li className={css.emptyItem}>
          There is no data for the selected month
        </li>
      ) : (
        filteredDays.map(day => (
          <li className={css.item} key={day.data}>
            <CalendarItem_1 day={day.data} percent={day.percent} />
          </li>
        ))
      )}
    </ul>
  );
};

export default Calendar_1;
