import { useSelector } from 'react-redux';
import { selectDate } from '../../redux/date/selectors';
import css from './CalendarItem_1.module.css';

const CalendarItem_1 = ({ day, percent }) => {
  const storeDate = new Date(useSelector(selectDate));
  const dateNumber = storeDate.getDate();
  const numericDay = parseInt(day, 10);
  const numericPercent = parseInt(percent.replace('%', ''), 10);
  return (
    <div className={css.dayInfo}>
      {numericDay === dateNumber ? (
        <p className={css.dayNumberCurrent}>{day}</p>
      ) : numericPercent < 100 ? (
        <p className={css.dayNumberPart}>{day}</p>
      ) : (
        <p className={css.dayNumberFull}>{day}</p>
      )}
      <p className={css.dayPercent}>{percent}</p>
    </div>
  );
};

export default CalendarItem_1;
