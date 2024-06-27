import css from './WaterProgressBar.module.css';
import Iconsvg from '../Icon/Icon';
import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { selectWaterDrink } from '../../redux/users/selectors';

const WaterProgressBar = () => {
  //const daylyNorm = useSelector(selectWaterDrink);

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
