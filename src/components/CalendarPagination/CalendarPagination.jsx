import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  addDays,
  addMonths,
  format,
  startOfDay,
  subDays,
  subMonths,
} from 'date-fns';
import css from './CalendarPagination.module.css';
import Icon from '../../shared/components/Icon/Icon';
import { paginationDate } from '../../redux/date/selectors';
import { changePaginationDate } from '../../redux/date/slice';
import { paginationBtnDisabled } from '../../redux/pagination/selectors';
import { changePaginationBtnDisabled } from '../../redux/pagination/slice';

const CalendarPagination = ({ viewStatistic }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const storeDate = new Date(useSelector(paginationDate));
  const btnDisabled = useSelector(paginationBtnDisabled);
  const startOfCurrentPeriod = subDays(storeDate, 6);
  const endOfCurrentPeriod = storeDate;

  const getPreviousPeriod = date => {
    if (viewStatistic) {
      const startOfPreviousWeek = subDays(date, 7);
      const endOfPreviousWeek = subDays(date, 7);
      return { start: startOfPreviousWeek, end: endOfPreviousWeek };
    } else {
      return subMonths(date, 1);
    }
  };

  const getNextPeriod = date => {
    if (viewStatistic) {
      const startOfNextWeek = addDays(date, 1);
      const endOfNextWeek = addDays(date, 7);
      return { start: startOfNextWeek, end: endOfNextWeek };
    } else {
      return addMonths(date, 1);
    }
  };

  const handlePreviousPeriod = () => {
    const previousPeriod = getPreviousPeriod(storeDate);

    if (viewStatistic) {
      dispatch(changePaginationDate(previousPeriod.end.toISOString()));
    } else {
      dispatch(changePaginationDate(previousPeriod.toISOString()));
    }

    dispatch(changePaginationBtnDisabled(false));
  };

  const handleNextPeriod = () => {
    const nextPeriod = getNextPeriod(storeDate);
    const today = startOfDay(new Date());

    if (viewStatistic) {
      const nextPeriodEndDay = startOfDay(nextPeriod.end);
      if (nextPeriodEndDay >= today) {
        dispatch(changePaginationBtnDisabled(true));
      } else {
        dispatch(changePaginationBtnDisabled(false));
      }

      dispatch(changePaginationDate(nextPeriod.end.toISOString()));
    } else {
      const currentPeriodBtn = format(today, 'MMMM yyyy');
      const nextPeriodBtn = format(nextPeriod, 'MMMM yyyy');

      if (currentPeriodBtn === nextPeriodBtn) {
        dispatch(changePaginationBtnDisabled(true));
      } else {
        dispatch(changePaginationBtnDisabled(false));
      }

      dispatch(changePaginationDate(nextPeriod.toISOString()));
    }
  };

  let formattedDate;
  if (viewStatistic) {
    formattedDate = `${format(startOfCurrentPeriod, 'dd MMM')} - ${format(
      endOfCurrentPeriod,
      'dd MMM'
    )}`;
  } else {
    const monthName = t(
      `months.${storeDate.toLocaleDateString('en-GB', { month: 'long' })}`
    );
    const year = storeDate.toLocaleDateString('en-GB', { year: 'numeric' });
    formattedDate = `${monthName}, ${year}`;
  }

  return (
    <div className={css.container}>
      <button
        type="button"
        className={css.button}
        onClick={handlePreviousPeriod}
      >
        <Icon
          width="18"
          height="18"
          iconName="chevron-left"
          className={css.icon}
        />
      </button>
      <div className={css.dateInfo}>{formattedDate}</div>
      <button
        type="button"
        className={css.button}
        onClick={handleNextPeriod}
        disabled={btnDisabled}
      >
        <Icon
          width="18"
          height="18"
          iconName="chevron-right"
          className={btnDisabled ? css.activeIcon : css.icon}
        />
      </button>
    </div>
  );
};

export default CalendarPagination;
