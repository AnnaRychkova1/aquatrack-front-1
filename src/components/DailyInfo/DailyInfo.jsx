import WaterList from '../WaterList/WaterList';
import css from './DailyInfo.module.css';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import ChooseDate from '../ChooseDate/ChooseDate';

const DailyInfo = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.cardHeader}>
        <ChooseDate />
        <AddWaterBtn />
      </div>
      <WaterList />
    </div>
  );
};

export default DailyInfo;
