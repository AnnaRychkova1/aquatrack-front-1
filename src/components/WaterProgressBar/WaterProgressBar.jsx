import { isSameDay, format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import css from './WaterProgressBar.module.css';
import Iconsvg from '../../shared/components/Icon/Icon';
import { selectWaterDrink } from '../../redux/users/selectors';
import { selectTotalDay } from '../../redux/water/selectors';
import { selectDate } from '../../redux/date/selectors';

const WaterProgressBar = () => {
  const { t } = useTranslation();
  const daylyNorm = useSelector(selectWaterDrink);
  const dayWaterAll = useSelector(selectTotalDay);
  const selectedDate = useSelector(selectDate);

  const waterAmount =
    typeof dayWaterAll === 'number' && daylyNorm && dayWaterAll >= 0
      ? Math.min((dayWaterAll * 100) / (daylyNorm * 1000), 100)
      : 0;

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
