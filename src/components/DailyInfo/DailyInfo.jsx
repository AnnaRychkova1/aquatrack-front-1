import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectDate } from '../../redux/date/selectors';
import { changeDate } from '../../redux/date/slice';
import ChooseDate from '../ChooseDate/ChooseDate';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import WaterList from '../WaterList/WaterList';
import css from './DailyInfo.module.css';

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
        <ChooseDate formattedDate={formattedDate} />
        <AddWaterBtn buttonStyle={css.cardIcon} iconStyle={css.cardIcon} />
      </div>
      <WaterList />
      <button onClick={handleChangeDate}>Previous day</button>
    </div>
  );
};

export default DailyInfo;
