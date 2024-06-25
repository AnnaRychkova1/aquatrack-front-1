import WaterDailyNorma from '../WaterDailyNorma/WaterDailyNorma';
import WaterProgressBar from '../WaterProgressBar/WaterProgressBar';
import css from './WaterMainInfo.module.css';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import Logo from '../Logo/Logo';

const WaterMainInfo = () => {
  return (
    <div className={css.trackContainerItem}>
      <div className={css.logoContainer}>
        <Logo />
      </div>

      <div className={css.imgInfoContainer}></div>
      <WaterDailyNorma />
      <WaterProgressBar />
      <div className={css.contBtn}>
        <AddWaterBtn
          buttonStyle={css.btn}
          iconStyle={css.icon}
          textStyle={css.textBtn}
        />
      </div>
    </div>
  );
};

export default WaterMainInfo;
