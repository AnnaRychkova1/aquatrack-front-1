import { useDispatch, useSelector } from 'react-redux';
// import { isSameDay } from 'date-fns';
import { useEffect } from 'react';
import { fetchDailyWater } from '../../redux/water/operations';
import { selectToken } from '../../redux/users/selectors';
import { selectWaterPortion } from '../../redux/water/selectors';
import { changeTotalDay } from '../../redux/water/slice';
import WaterItem from '../WaterItem/WaterItem';
import css from './WaterList.module.css';

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

  // Отримуємо зі стору масив даних
  const waterPortions = useSelector(selectWaterPortion);

  // Обчислюємо загальну кількість випитої води за день
  useEffect(() => {
    const totalVolume = waterPortions.reduce((sum, item) => {
      return sum + item.volume;
    }, 0);
    dispatch(changeTotalDay(totalVolume));
  }, [dispatch, waterPortions]);

  return (
    <div className="reactour__waterCardList">
      <ul className={css.list}>
        {waterPortions.length === 0 ? (
          <li className={css.emptyItem}>
            There is no data for the selected date
          </li>
        ) : (
          waterPortions.map((waterItem, index) => (
            <li className={css.item} key={`${waterItem._id}-${index}`}>
              <WaterItem
                id={waterItem._id}
                volume={waterItem.volume}
                date={waterItem.date}
                isEditable={true}
                // isEditable={isSameDay(new Date(), waterItem.date)}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default WaterList;
