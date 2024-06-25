import { useSelector } from 'react-redux';
import { selectDate } from '../../redux/date/selectors';
import ChooseDate from '../ChooseDate/ChooseDate';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import WaterList from '../WaterList/WaterList';
import css from './DailyInfo.module.css';

const DailyInfo = () => {
  // Поточна календарна дата
  const currentDate = new Date();
  // Дата зі стору
  const storeDate = new Date(useSelector(selectDate));
  let formattedDate;

  // Якщо дата зі стору = календарній даті => Today
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
        <AddWaterBtn
          buttonStyle={css.cardButton}
          iconStyle={css.cardIcon}
          textStyle={css.cardText}
        />
      </div>
      <WaterList selectDay={storeDate} />
    </div>
  );
};

export default DailyInfo;
