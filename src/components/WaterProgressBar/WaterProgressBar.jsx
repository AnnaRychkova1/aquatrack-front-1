import css from './WaterProgressBar.module.css';
import Iconsvg from '../../shared/components/Icon/Icon';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectWaterDrink } from '../../redux/users/selectors';
import { selectTotalDay } from '../../redux/water/selectors';
import { selectDate } from '../../redux/date/selectors';
import { isSameDay, format } from 'date-fns';
import { useTranslation } from 'react-i18next';

const WaterProgressBar = () => {
  const { t } = useTranslation();
  const daylyNorm = useSelector(selectWaterDrink);
  const dayWaterAll = useSelector(selectTotalDay);

  const selectedDate = useSelector(selectDate);

  const [waterAmount, setWaterAmount] = useState(0);

  useEffect(() => {
    if (typeof dayWaterAll === 'number') {
      let waterAmount = 0;

      if (daylyNorm && dayWaterAll >= 0) {
        waterAmount = (dayWaterAll * 100) / (daylyNorm * 1000);
      } else {
        waterAmount = 100;
      }
      setWaterAmount(Math.min(waterAmount, 100));
    } else {
      setWaterAmount(0);
    }
  }, [daylyNorm, dayWaterAll, selectedDate]);

  const formatDate = date => {
    if (isSameDay(new Date(), new Date(date))) {
      return t('trackerPage.today');
    }
    return format(new Date(date), 'dd MMMM');
  };

  return (
    <div className={`reactour__waterPercentage ${css.contBar}`}>
      <p className={css.textBar}>{formatDate(selectedDate)} </p>
      <div className={css.waterProgressBarWrapper}>
        <div className={css.waterProgressBar}>
          <div
            className={css.waterProgressBarFiller}
            style={{
              width: `${waterAmount}%`,
            }}
          >
            <div className={css.waterProgressBarContent}>
              <Iconsvg width={24} height={24} iconName="water-progress-bar" />
              <span className={css.waterProgressBarLabel}>
                {`${Math.round(waterAmount)}%`}
              </span>
            </div>
          </div>
        </div>
        <div className={css.progressLabels}>
          <span className={css.progressLabelLeft}>0%</span>
          <span className={css.progressLabelRight}>100%</span>
        </div>
      </div>
    </div>
  );
};

export default WaterProgressBar;
