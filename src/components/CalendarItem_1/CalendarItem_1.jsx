import { useDispatch, useSelector } from 'react-redux';
import { getDate, isSameDay } from 'date-fns';
import { selectDate } from '../../redux/date/selectors';
import { changeDate } from '../../redux/date/slice';
import css from './CalendarItem_1.module.css';

const CalendarItem_1 = ({ date, percent }) => {
  //  date   Fri Jun 21 2024 00:00:00 GMT+0300 (Восточная Европа, летнее время)
  const determineDate = useSelector(selectDate);
  const dispatch = useDispatch();
  const handleChangeDate = data => {
    //  Прибираємо різницю в часових поясах
    const localDate = new Date(data);
    const localISOTime = new Date(
      localDate.getTime() - localDate.getTimezoneOffset() * 60000
    ).toISOString();
    dispatch(changeDate(localISOTime));
  };

  // const isCurrentDate = isToday(date);
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

export default CalendarItem_1;
