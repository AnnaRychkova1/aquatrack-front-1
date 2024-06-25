import WaterItem from '../WaterItem/WaterItem';
import dbClone from './db_clone.json';
import css from './WaterList.module.css';

const formatTime = dateString => {
  const date = new Date(dateString);
  const options = { hour: 'numeric', minute: 'numeric', hour12: true };
  return date.toLocaleTimeString('en-US', options);
};

const WaterList = ({ selectDay }) => {
  // Отримаємо календарну дату
  const calendarDate = new Date();

  // Фільтруємо масив dbClone по даті зі стору
  const filteredDbClone = dbClone.filter(item => {
    console.log(item.date);
    const dbDate = new Date(item.date);
    console.log(dbDate);
    return (
      dbDate.getDate() === selectDay.getDate() &&
      dbDate.getMonth() === selectDay.getMonth() &&
      dbDate.getFullYear() === selectDay.getFullYear()
    );
  });
  return (
    <ul className={css.list}>
      {filteredDbClone.length === 0 ? (
        <li className={css.emptyItem}>
          There is no data for the selected date
        </li>
      ) : (
        filteredDbClone.map(waterItem => (
          <li className={css.item} key={waterItem.id}>
            <WaterItem
              id={waterItem.id}
              volume={waterItem.volume}
              time={formatTime(waterItem.date)}
              isEditable={
                calendarDate.getDate() === new Date(waterItem.date).getDate() &&
                calendarDate.getMonth() ===
                  new Date(waterItem.date).getMonth() &&
                calendarDate.getFullYear() ===
                  new Date(waterItem.date).getFullYear()
              }
            />
          </li>
        ))
      )}
    </ul>
  );
};

export default WaterList;
