import css from './WaterDailyNorma.module.css';
import { useSelector } from 'react-redux';
import { selectWaterDrink } from '../../redux/users/selectors';

const WaterDailyNorma = () => {
  const daylyNorm = useSelector(selectWaterDrink);

  return (
    <div className="reactour__waterDailyNorma">
      <div className={css.contDailyNorma}>
        <p className={css.dailyNorma}>{daylyNorm ? `${daylyNorm} L` : '0L'}</p>
        <p className={css.textDailyNorma}>My daily norma</p>
      </div>
    </div>
  );
};

export default WaterDailyNorma;
