import WaterDailyNorma from '../WaterDailyNorma/WaterDailyNorma';
import WaterProgressBar from '../WaterProgressBar/WaterProgressBar';
import css from './WaterMainInfo.module.css';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import Logo from '../Logo/Logo';

const WaterMainInfo = () => {
  return (
    <div className={css.trackContainerItem}>
      <div className={css.topContainer}>
        <div className="reactour__Bye">
          <Logo />
        </div>
      </div>

      <WaterDailyNorma />
      <WaterProgressBar />

      <div className={css.btnContainer}>
        <div className="reactour__waterAdd">
          <AddWaterBtn
            buttonStyle={css.contBtn}
            iconStyle={css.icon}
            textStyle={css.textBtn}
          />
        </div>
      </div>
    </div>
  );
};

export default WaterMainInfo;
