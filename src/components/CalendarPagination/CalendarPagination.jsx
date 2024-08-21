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
  const endOfCurrentPeriod = startOfDay(storeDate);
  const startOfCurrentPeriod = subDays(endOfCurrentPeriod, 6);

  const handlePreviousPeriod = () => {
    const previousPeriod = viewStatistic
      ? {
          start: subDays(endOfCurrentPeriod, 7),
          end: subDays(startOfCurrentPeriod, 7),
        }
      : subMonths(storeDate, 1);

    if (viewStatistic) {
      dispatch(changePaginationDate(previousPeriod.start.toISOString()));
    } else {
      dispatch(changePaginationDate(previousPeriod.toISOString()));
    }

    dispatch(changePaginationBtnDisabled(false));
  };

  const handleNextPeriod = () => {
    const nextPeriod = viewStatistic
      ? {
          start: addDays(startOfCurrentPeriod, 7),
          end: addDays(endOfCurrentPeriod, 7),
        }
      : addMonths(storeDate, 1);

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
    const startMonth = t(`shortMonths.${format(startOfCurrentPeriod, 'MMM')}`);
    const endMonth = t(`shortMonths.${format(endOfCurrentPeriod, 'MMM')}`);
    formattedDate = `${format(
      startOfCurrentPeriod,
      'dd'
    )} ${startMonth} - ${format(endOfCurrentPeriod, 'dd')} ${endMonth}`;
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
