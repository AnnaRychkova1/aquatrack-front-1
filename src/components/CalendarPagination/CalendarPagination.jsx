// import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { paginationDate, paginationBtnDisabled } from '../../redux/date/selectors';
import { changePaginationDate, changePaginationBtnDisabled } from '../../redux/date/slice';
import css from './CalendarPagination.module.css';
import Icon from '../Icon/Icon';

const CalendarPagination = () => {
  const dispatch = useDispatch();
  const storeDate = new Date(useSelector(paginationDate));
  const btnDisabled = useSelector(paginationBtnDisabled);

  const getPreviousMounth = date => {
    const currentDate = new Date(date);
    currentDate.setMonth(currentDate.getMonth() - 1);
      return currentDate;
  };

  const getNextMounth = date => {
    const currentDate = new Date(date);
    currentDate.setMonth(currentDate.getMonth() + 1);
      return currentDate;
  };

    const handlePreviousMounth = () => {
    const previousMounth = getPreviousMounth(storeDate);
    dispatch(changePaginationDate(new Date(previousMounth).toISOString()));
    dispatch(changePaginationBtnDisabled(false)); 
  };

  const handleNextMounth = () => {
    const nextMounth = getNextMounth(storeDate);
    const currentBtnMonth = new Date().toLocaleDateString('en-GB', {
      month: 'long',
    });
    const nextBtnMonth = new Date(nextMounth).toLocaleDateString('en-GB', {
      month: 'long',
    });

    if (currentBtnMonth === nextBtnMonth) {
      dispatch(changePaginationBtnDisabled(true));
    }
    
    dispatch(changePaginationDate(new Date(nextMounth).toISOString()));
  };

  const formattedMonth = `${storeDate.toLocaleDateString('en-GB', {
    month: 'long',
  })}`;

  const formattedYear = `${storeDate.toLocaleDateString('en-GB', {
    year: 'numeric',
  })}`;
  return (
    <div className={css.container}>
      <button type="button" className={css.button} onClick={handlePreviousMounth}>
          <Icon
            width="18"
            height="18"
            iconName="chevron-left"
            className={css.icon}
          />
      </button>
      <div className={css.dateInfo}>{formattedMonth}, {formattedYear}</div>
      <button type="button" className={css.button} onClick={handleNextMounth} disabled={btnDisabled}>
          <Icon
            width="18"
            height="18"
            iconName="chevron-right"
            className={css.icon}
          />
      </button>
    </div>
  );
};

export default CalendarPagination;
