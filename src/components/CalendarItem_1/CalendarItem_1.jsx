import css from './CalendarItem_1.module.css';
const CalendarItem_1 = ({ day, percent }) => {
  const numericPercent = parseInt(percent.replace('%', ''), 10);
  return (
    <div className={css.dayInfo}>
      {numericPercent < 100 ? (
        <p className={css.dayNumberPart}>{day}</p>
      ) : (
        <p className={css.dayNumberFull}>{day}</p>
      )}
      <p className={css.dayPercent}>{percent}</p>
    </div>
  );
};

export default CalendarItem_1;
