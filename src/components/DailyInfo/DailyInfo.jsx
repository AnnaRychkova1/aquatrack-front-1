import { useSelector } from 'react-redux';
import { isSameDay, format, getDate } from 'date-fns';
import { selectDate } from '../../redux/date/selectors';
import ChooseDate from '../ChooseDate/ChooseDate';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import WaterList from '../WaterList/WaterList';
import css from './DailyInfo.module.css';

const DailyInfo = () => {
  // Дата зі стору
  const storeDate = useSelector(selectDate);
  let formattedDate;

  // Якщо дата зі стору = календарній даті => Today
  if (isSameDay(new Date(), storeDate)) {
    formattedDate = 'Today';
  } else {
    formattedDate = `${getDate(storeDate)}, ${format(
      new Date(storeDate),
      'MMMM'
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
