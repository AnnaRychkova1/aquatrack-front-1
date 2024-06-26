import css from './WaterDailyNorma.module.css';
// import { useSelector } from 'react-redux';
// import { selectQuantity } from '../../redux/water/selectors.js';

const WaterDailyNorma = () => {
  // const daylyNorm = useSelector(selectQuantity);
  return (
    <div className={css.contDailyNorma}>
      {/* <p className={css.dailyNorma}>{daylyNorm ? `${daylyNorm}L` : '0L'}</p> */}
      <p className={css.dailyNorma}>1.5L</p>
      <p className={css.textDailyNorma}>My daili norma</p>
    </div>
  );
};

export default WaterDailyNorma;
