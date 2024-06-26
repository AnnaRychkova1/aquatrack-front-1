import css from './WaterDailyNorma.module.css';
// import { useSelector } from 'react-redux';
// import { selectUser } from '../../redux/water/selectors.js';

const WaterDailyNorma = () => {
  //const daylyNorm = useSelector(selectUser).waterDrink;
  return (
    <div className={css.contDailyNorma}>
      {/* <p className={css.dailyNorma}>{daylyNorm ? `${daylyNorm}L` : '0L'}</p> */}

      <p className={css.dailyNorma}>1.5 L</p>
      <p className={css.textDailyNorma}>My daily norma</p>
    </div>
  );
};

export default WaterDailyNorma;
