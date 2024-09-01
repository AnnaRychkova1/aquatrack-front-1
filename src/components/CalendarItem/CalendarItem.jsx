import { useDispatch, useSelector } from 'react-redux';
import { getDate, isSameDay } from 'date-fns';

import css from './CalendarItem.module.css';
import { selectDate } from '../../redux/date/selectors';
import { changeDate } from '../../redux/date/slice';

const CalendarItem = ({ date, percent }) => {
  const determineDate = useSelector(selectDate);
  const dispatch = useDispatch();
  const handleChangeDate = data => {
    const localDate = new Date(data);
    const utcDate = new Date(
      localDate.getTime() - localDate.getTimezoneOffset() * 60000
    ).toISOString();
    dispatch(changeDate(utcDate));
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
