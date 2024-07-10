// import Calendar from '../Calendar/Calendar';
import Calendar_1 from '../Calendar_1/Calendar_1';
import CalendarPagination from '../CalendarPagination/CalendarPagination';
import Statistic from '../Statistic/Statistic';
import { useSelector, useDispatch } from 'react-redux';
import { viewStatistics } from '../../redux/pagination/selectors';
import { changeViewStatistics } from '../../redux/pagination/slice';
import { changeDate } from '../../redux/date/slice';
import { changePaginationDate } from '../../redux/date/slice';
import { selectMonth } from '../../redux/water/selectors';
import Icon from '../Icon/Icon';
import css from './MonthInfo.module.css';

const MonthInfo = () => {
  const dispatch = useDispatch();
  const viewStatistic = useSelector(viewStatistics);
  const waterPortions = useSelector(selectMonth);
  const currentDate = new Date().toISOString();

  return (
    <div className="reactour__waterMonthInfo">
      <div className={css.wrapper}>
        <div className={css.header}>
          <div className={css.titleHeader}>
            <h3 className={css.title}>
              {!viewStatistic ? 'Month' : 'Statistics'}
            </h3>
            <button
              type="button"
              className={css.todayButton}
              onClick={() => {
                dispatch(changeDate(currentDate));
                dispatch(changePaginationDate(currentDate));
              }}
            >
              Today
            </button>
          </div>
          <div className={css.pagination}>
            <CalendarPagination />
            <div className="reactour__waterStatisticInfo">
              <button
                type="button"
                className={css.button}
                onClick={() => {
                  dispatch(changeViewStatistics(!viewStatistic));
                }}
              >
                <Icon
                  iconName="pie-chart-1"
                  className={viewStatistic ? css.activeIcon : css.icon}
                />
              </button>
            </div>
          </div>
        </div>
        {!viewStatistic ? <Calendar_1 /> : <Statistic data={waterPortions} />}
      </div>
    </div>
  );
};

export default MonthInfo;
