import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchDailyWater } from '../../redux/water/operations';
import { selectToken } from '../../redux/users/selectors';
import { selectWaterPortion } from '../../redux/water/selectors';
import WaterItem from '../WaterItem/WaterItem';
import css from './WaterList.module.css';

const formatTime = dateString => {
  const date = new Date(dateString);
  const options = { hour: 'numeric', minute: 'numeric', hour12: true };
  return date.toLocaleTimeString('en-US', options);
};

const WaterList = ({ selectDay }) => {
  // Форматуємо дату в формат YYYY-MM-DD
  const initDate = new Date(selectDay);
  const year = initDate.getFullYear();
  const month = String(initDate.getMonth() + 1).padStart(2, '0'); // Місяці від 0 до 11
  const day = String(initDate.getDate()).padStart(2, '0'); // Дні від 1 до 31

  const formatDate = `${year}-${month}-${day}`;

  // Отримуємо дані з БД
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  useEffect(() => {
    if (token) {
      dispatch(fetchDailyWater({ date: formatDate, token }));
    }
  }, [dispatch, token, formatDate]);

  // Отримуємо поточну календарну дату
  const calendarDate = new Date();

  // Отримуємо зі стору
  const waterPortions = useSelector(selectWaterPortion);

  return (
    <ul className={css.list}>
      {waterPortions.length === 0 ? (
        <li className={css.emptyItem}>
          There is no data for the selected date
        </li>
      ) : (
        waterPortions.map(waterItem => (
          <li className={css.item} key={waterItem._id}>
            <WaterItem
              id={waterItem._id}
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
