import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { isSameDay, format, getDate } from 'date-fns';

import css from './DailyInfo.module.css';
import AddWaterBtn from '../../shared/components/AddWaterBtn/AddWaterBtn';
import WaterList from '../WaterList/WaterList';
import { selectDate } from '../../redux/date/selectors';

const DailyInfo = () => {
  const { t } = useTranslation();
  // Дата зі стору
  const storeDate = useSelector(selectDate);
  let formattedDate;

  // Якщо дата зі стору = календарній даті => Today
  if (isSameDay(new Date(), storeDate)) {
    formattedDate = t('trackerPage.today');
  } else {
    formattedDate = `${getDate(storeDate)}, ${format(
      new Date(storeDate),
      'MMMM'
    )}`;
  }
  return (
    <div className={css.wrapper}>
      <div className={css.cardHeader}>
        <h3 className={css.cardTitle}>{formattedDate}</h3>
        <div className="reactour__waterAddCard">
          <AddWaterBtn
            buttonStyle={css.cardButton}
            iconStyle={css.cardIcon}
            textStyle={css.cardText}
          />
        </div>
      </div>
      <WaterList selectDay={storeDate} />
    </div>
  );
};

export default DailyInfo;
