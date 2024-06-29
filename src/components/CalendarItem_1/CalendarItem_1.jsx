import { useDispatch } from 'react-redux';
import { getDate, isToday } from 'date-fns';
import { changeDate } from '../../redux/date/slice';
import css from './CalendarItem_1.module.css';

const CalendarItem_1 = ({ date, percent }) => {
  //  date   Fri Jun 21 2024 00:00:00 GMT+0300 (Восточная Европа, летнее время)

  const dispatch = useDispatch();
  const handleChangeDate = data => {
    dispatch(changeDate(new Date(data).toISOString()));
  };

  const buttonClass = isToday(date)
    ? css.dayNumberCurrent
    : percent < 100
    ? css.dayNumberPart
    : css.dayNumberFull;

  return (
    <div className={css.dayInfo}>
      <button
        className={buttonClass}
        type="button"
        aria-label="Date on the calendar"
        onClick={() => handleChangeDate(date)}
      >
        {getDate(date)}
      </button>
      <p className={css.dayPercent}>{percent > 99 ? 100 : percent}%</p>
    </div>
  );
};

export default CalendarItem_1;
