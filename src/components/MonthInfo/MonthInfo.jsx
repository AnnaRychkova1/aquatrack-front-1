import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import css from './MonthInfo.module.css';
import Icon from '../../shared/components/Icon/Icon';
import Statistic from '../Statistic/Statistic';
import CalendarPagination from '../CalendarPagination/CalendarPagination';
import Calendar from '../Calendar/Calendar';
import { viewStatistics } from '../../redux/pagination/selectors';
import { changeViewStatistics } from '../../redux/pagination/slice';
import { changeDate } from '../../redux/date/slice';
import { changePaginationDate } from '../../redux/date/slice';
import { selectMonth } from '../../redux/water/selectors';

const MonthInfo = () => {
  const { t } = useTranslation();
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
              {!viewStatistic
                ? t('trackerPage.month')
                : t('trackerPage.statistics')}
            </h3>
            <button
              type="button"
              className={css.todayButton}
              onClick={() => {
                dispatch(changeDate(currentDate));
                dispatch(changePaginationDate(currentDate));
              }}
            >
              {t('trackerPage.today')}
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
        {!viewStatistic ? <Calendar /> : <Statistic data={waterPortions} />}
      </div>
    </div>
  );
};

export default MonthInfo;
