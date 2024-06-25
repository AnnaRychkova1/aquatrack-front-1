// import Calendar from '../Calendar/Calendar';
import Calendar_1 from '../Calendar_1/Calendar_1';
import CalendarPagination from '../CalendarPagination/CalendarPagination';
import Icon from '../Icon/Icon';
import css from './MonthInfo.module.css';

const MonthInfo = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <h3 className={css.title}>Month</h3>
        <div className={css.pagination}>
          <CalendarPagination />
          <Icon
            width="24"
            height="24"
            iconName="pie-chart-1"
            className={css.icon}
          />
        </div>

        {/* <Calendar /> */}
      </div>
      <Calendar_1 />
    </div>
  );
};

export default MonthInfo;
