import { useSelector } from 'react-redux';
import { selectDate } from '../../redux/date/selectors';
import { useDispatch } from 'react-redux';
import { changeDate } from '../../redux/date/slice';
import css from './CalendarItem_1.module.css';

// Функція для визначення дати з dateTime у форматі 'YYYY-MM-DD'
const extractDate = dateTime => {
  return dateTime.split('T')[0];
};

const CalendarItem_1 = ({ date, percent }) => {
  const dispatch = useDispatch();
  // Дата зі стору
  const storeDate = new Date(useSelector(selectDate));
  const storeDay = storeDate.toLocaleDateString('en-CA');

  const formatDate = new Date(date);
  const dayOfMonth = formatDate.getDate();

  const handleChangeDate = data => {
    dispatch(changeDate(new Date(data).toISOString()));
  };

  return (
    <div className={css.dayInfo}>
      {storeDay === extractDate(date) ? (
        <button
          className={css.dayNumberCurrent}
          type="button"
          aria-label="Date on the calendar"
          onClick={() => handleChangeDate(date)}
        >
          {dayOfMonth}
        </button>
      ) : percent < 100 ? (
        <button
          className={css.dayNumberPart}
          type="button"
          aria-label="Date on the calendar"
          onClick={() => handleChangeDate(date)}
        >
          {dayOfMonth}
        </button>
      ) : (
        <button
          className={css.dayNumberFull}
          type="button"
          aria-label="Date on the calendar"
          onClick={() => handleChangeDate(date)}
        >
          {dayOfMonth}
        </button>
      )}
      <p className={css.dayPercent}>{percent}%</p>
    </div>
  );
};

export default CalendarItem_1;
