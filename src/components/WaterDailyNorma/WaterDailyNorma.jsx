import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import css from './WaterDailyNorma.module.css';
import { selectWaterDrink } from '../../redux/users/selectors';

const WaterDailyNorma = () => {
  const { t } = useTranslation();
  const daylyNorm = useSelector(selectWaterDrink);

  return (
    <div className={`reactour__waterDailyNorma ${css.contDailyNorma}`}>
      <p className={css.dailyNorma}>
        {daylyNorm} {t('trackerPage.liter')}
      </p>
      <p className={css.textDailyNorma}>{t('trackerPage.dailyNorma')}</p>
    </div>
  );
};

export default WaterDailyNorma;
