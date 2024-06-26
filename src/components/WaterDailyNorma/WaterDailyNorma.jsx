import css from './WaterDailyNorma.module.css';

const WaterDailyNorma = () => {
  return (
    <div className={css.contDailyNorma}>
      <p className={css.dailyNorma}>1.5 L</p>
      <p className={css.textDailyNorma}>My daily norma</p>
    </div>
  );
};

export default WaterDailyNorma;
