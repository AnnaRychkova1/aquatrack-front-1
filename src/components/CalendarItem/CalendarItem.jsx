import { useDispatch, useSelector } from 'react-redux';
import { getDate, isSameDay } from 'date-fns';
import { selectDate } from '../../redux/date/selectors';
import { changeDate } from '../../redux/date/slice';
import css from './CalendarItem.module.css';

const CalendarItem = ({ date, percent }) => {
  const determineDate = useSelector(selectDate);
  const dispatch = useDispatch();
  const handleChangeDate = data => {
    const localDate = new Date(data);
    const localISOTime = new Date(
      localDate.getTime() - localDate.getTimezoneOffset() * 60000
    ).toISOString();
    dispatch(changeDate(localISOTime));
  };

  const buttonClass = isSameDay(date, determineDate)
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

export default CalendarItem;
