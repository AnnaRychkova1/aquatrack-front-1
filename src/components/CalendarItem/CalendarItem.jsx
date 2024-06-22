import { useDispatch, useSelector } from 'react-redux';
import css from './CalendarItem.module.css';
import { selectMonth, selectMonthWater } from '../../redux/water/selectors';
import { selectUser } from '../../redux/auth/selectors';
import { chooseDay } from '../../redux/water/operations';
import clsx from 'clsx';

const CalendarItem = ({ day, profit = 0 }) => {
  const monthWater = useSelector(selectMonthWater);
  const month = useSelector(selectMonth);
  const dayNorma = useSelector(selectUser).dailyWaterNorm;

  profit = 0;

  const dispatch = useDispatch();

  if (monthWater[day]) {
    if (dayNorma) {
      profit = (monthWater[day] * 100) / (dayNorma * 1000);
    } else {
      profit = 100;
    }
  }
  const lowProfit = profit => {
    return clsx(css.dayBtn, profit < 100 && css.profitLow);
  };

  function handleClick() {
    if (day < 9) {
      dispatch(chooseDay('0' + day + '.' + month));
    } else {
      dispatch(chooseDay(day + '.' + month));
    }
  }

  return (
    <>
      <button className={lowProfit(profit)} onClick={handleClick}>
        {day}
      </button>
      <span className={css.profit}>{profit.toFixed(0)} %</span>
    </>
  );
};

export default CalendarItem;
