import { useSelector } from 'react-redux';
import { selectDate } from '../../redux/date/selectors';
import { useDispatch } from 'react-redux';
import { changeDate } from '../../redux/date/slice';
import css from './CalendarItem_1.module.css';

const CalendarItem_1 = ({ day, percent }) => {
  const dispatch = useDispatch();
  // Дата зі стору
  const storeDate = new Date(useSelector(selectDate));
  const storeDay = storeDate.getDate();

  // Дата з календаря
  const сalendarDate = new Date(day);
  const сalendarDay = сalendarDate.getDate();

  const numericPercent = parseInt(percent.replace('%', ''), 10);

  const handleChangeDate = data => {
    dispatch(changeDate(new Date(data).toISOString()));
  };

  return (
    <div className={css.dayInfo}>
      {storeDay === сalendarDay ? (
        <button
          className={css.dayNumberCurrent}
          type="button"
          aria-label="Date on the calendar"
          onClick={() => handleChangeDate(day)}
        >
          {сalendarDay}
        </button>
      ) : numericPercent < 100 ? (
        <button
          className={css.dayNumberPart}
          type="button"
          aria-label="Date on the calendar"
          onClick={() => handleChangeDate(day)}
        >
          {сalendarDay}
        </button>
      ) : (
        <button
          className={css.dayNumberFull}
          type="button"
          aria-label="Date on the calendar"
          onClick={() => handleChangeDate(day)}
        >
          {сalendarDay}
        </button>
      )}
      <p className={css.dayPercent}>{percent}</p>
    </div>
  );
};

export default CalendarItem_1;
