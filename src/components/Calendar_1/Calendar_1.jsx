import CalendarItem_1 from '../CalendarItem_1/CalendarItem_1';
import days from './days.json';
import css from './Calendar_1.module.css';
const Calendar_1 = () => {
  return (
    <ul className={css.list}>
      {days.map(day => {
        return (
          <li key={day.Number}>
            <CalendarItem_1 day={day.Number} percent={day.Percent} />
          </li>
        );
      })}
    </ul>
  );
};

export default Calendar_1;
