import { useTour } from '@reactour/tour';
import { useRef } from 'react';
import WaterDailyNorma from '../WaterDailyNorma/WaterDailyNorma';
import WaterProgressBar from '../WaterProgressBar/WaterProgressBar';
import css from './WaterMainInfo.module.css';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import Logo from '../Logo/Logo';

const WaterMainInfo = () => {
  const firstStep = useRef(null);
  const { setIsOpen } = useTour();

  return (
    <div className={css.trackContainerItem}>
      <div className="reactour__Bye">
        <div className={css.logoContainer}>
          <Logo />
        </div>
      </div>

      <div ref={firstStep} className="first-step">
        <button
          className={`first-step ${css.tour}`}
          onClick={() => setIsOpen(true)}
        >
          App guide
        </button>
      </div>

      <div className={css.imgInfoContainer}></div>
      <WaterDailyNorma />
      <WaterProgressBar />
      {/* <div className="reactour__waterAdd"> */}
      <AddWaterBtn
        buttonStyle={css.contBtn}
        iconStyle={css.icon}
        textStyle={css.textBtn}
      />
      {/* </div> */}
    </div>
  );
};

export default WaterMainInfo;
