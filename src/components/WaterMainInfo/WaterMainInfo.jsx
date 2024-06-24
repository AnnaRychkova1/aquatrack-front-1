import WaterDailyNorma from './WaterDailyNorma/WaterDailyNorma';
import WaterProgressBar from './WaterProgressBar/WaterProgressBar';
import css from './WaterMainInfo.module.css';
import AddWaterMainInfoBtn from './AddWaterMainInfoBtn/AddWaterMainInfoBtn';
import LogoTracker from './LogoTracker/LogoTracker';

const WaterMainInfo = () => {
  return (
    <div className={css.trackContainerItem}>
      <LogoTracker />
      <div className={css.imgInfoContainer}></div>
      <WaterDailyNorma />
      <WaterProgressBar />
      <AddWaterMainInfoBtn />
    </div>
  );
};

export default WaterMainInfo;
