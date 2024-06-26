import css from './WaterProgressBar.module.css';
import Iconsvg from '../Icon/Icon';
import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { selectDate } from '../../redux/date/selectors';

// import {
//   selectQuantity,
//   selectDateWater,
// } from '../../redux/water/selectors.js'; /*для отримання даних про кількість води і дату води.*/
// import { getDayWater } from '../../redux/water/operations.js'; /* для отримання даних про воду для певного дня.*/

const WaterProgressBar = () => {
  //   const dayWater = useSelector(selectDateWater);
  //   const dayNorma = useSelector(selectQuantity);

  //   // Дата зі стору
  //   const storeDate = new Date(useSelector(selectDate));
  //   const storeDay = storeDate.getDate();

  //   // Дата з календаря
  //   const сalendarDate = new Date(day);
  //   const сalendarDay = сalendarDate.getDate();

  const [completed, setCompleted] = useState(50);

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const response = await fetch('/api/progress');
        const data = await response.json();
        if (data && typeof data.completed === 'number') {
          setCompleted(data.completed);
        } else {
          console.error('Invalid data format:', data);
        }
      } catch (error) {
        console.error('Error fetching progress data:', error);
      }
    };

    fetchProgressData();
  }, []);

  return (
    <div className={css.contBar}>
      {/* <p className={css.textBar}>
        {storeDay === сalendarDay ? 'Today' : сalendarDay}
      </p> */}

      <p className={css.textBar}>Today</p>
      <div className={css.waterProgressBarWrapper}>
        <div className={css.waterProgressBar}>
          <div
            className={css.waterProgressBarFiller}
            style={{
              width: `${completed}%`,
            }}
          >
            <div className={css.waterProgressBarContent}>
              <Iconsvg width={24} height={24} iconName="water-progress-bar" />
              <span className={css.waterProgressBarLabel}>
                {`${completed}%`}
              </span>
            </div>
          </div>
        </div>
        <div className={css.progressLabels}>
          <span className={css.progressLabelLeft}>0%</span>
          <span className={css.progressLabelMid}>50%</span>
          <span className={css.progressLabelRight}>100%</span>
        </div>
      </div>
    </div>
  );
};

export default WaterProgressBar;
