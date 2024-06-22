import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectDate } from '../../redux/date/selectors';
import { changeDate } from '../../redux/date/slice';
import WaterList from '../WaterList/WaterList';
import css from './DailyInfo.module.css';
import Iconsvg from '../Icon/Icon';

const DailyInfo = () => {
  const dispatch = useDispatch();
  const currentDate = new Date();
  const storeDate = new Date(useSelector(selectDate));
  let formattedDate;

  const getPreviousDate = date => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() - 1);
    return currentDate.toISOString().slice(0, 10);
  };

  const handleChangeDate = () => {
    const previousDate = getPreviousDate(storeDate);
    dispatch(changeDate(new Date(previousDate).toISOString()));
  };

  if (
    currentDate.toISOString().slice(0, 10) ===
    storeDate.toISOString().slice(0, 10)
  ) {
    formattedDate = 'Today';
  } else {
    formattedDate = `${storeDate.getDate()}, ${storeDate.toLocaleDateString(
      'en-GB',
      { month: 'long' }
    )}`;
  }

  return (
    <div className={css.wrapper}>
      <div className={css.cardHeader}>
        <h3 className={css.cardTitle}>{formattedDate}</h3>
        <button className={css.cardButton} type="button" aria-label="Add water">
          <Iconsvg
            width="30"
            height="30"
            iconName="plus_dark"
            styles={css.cardIcon}
          />
          <span className={css.cardButtonTitle}>Add water</span>
        </button>
      </div>
      <WaterList />
      <button onClick={handleChangeDate}>Previous day</button>
    </div>
  );
};

export default DailyInfo;
