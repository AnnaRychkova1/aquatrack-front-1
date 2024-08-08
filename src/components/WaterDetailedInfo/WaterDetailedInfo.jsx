import DailyInfo from '../DailyInfo/DailyInfo';
import MonthInfo from '../MonthInfo/MonthInfo';
import UserPanel from '../UserPanel/UserPanel';

import css from './WaterDetailedInfo.module.css';

const WaterDetailedInfo = () => {
  return (
    <section className={css.trackContainerItem}>
      <UserPanel />
      <DailyInfo />
      <MonthInfo />
    </section>
  );
};

export default WaterDetailedInfo;
