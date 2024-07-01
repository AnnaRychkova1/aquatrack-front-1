import css from './WaterDailyNorma.module.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectWaterDrink } from '../../redux/users/selectors';
import { updateUserProfiles } from '../../services/userApi';

const WaterDailyNorma = () => {
  const daylyNorm = useSelector(selectWaterDrink);

  useEffect(() => {
    const updateDailyNorm = async newNorm => {
      const formData = { dailyNorm: newNorm };
      await updateUserProfiles(formData);
    };

  }, [daylyNorm]);

  return (
    <div className={css.contDailyNorma}>
      <p className={css.dailyNorma}>{daylyNorm ? `${daylyNorm} L` : '0L'}</p>
      <p className={css.textDailyNorma}>My daily norma</p>
    </div>
  );
};

export default WaterDailyNorma;
