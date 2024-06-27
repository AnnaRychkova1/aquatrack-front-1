import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
// import WaterItem from '../WaterItem/WaterItem';
import { fetchDailyWater } from '../../redux/water/operations';
import css from './WaterList.module.css';

// const formatTime = dateString => {
//   const date = new Date(dateString);
//   const options = { hour: 'numeric', minute: 'numeric', hour12: true };
//   return date.toLocaleTimeString('en-US', options);
// };

const WaterList = ({ selectDay }) => {
  // Отримаємо календарну дату
  // const calendarDate = new Date();
  // Отримуємо дані з БД
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(selectDay);
    dispatch(fetchDailyWater(selectDay));
  }, [dispatch, selectDay]);

  return (
    <ul className={css.list}>
      {/* {filteredDbClone.length === 0 ? (
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
      )} */}
    </ul>
  );
};

export default WaterList;
