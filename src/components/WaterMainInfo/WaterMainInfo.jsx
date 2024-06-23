// import css from "./WaterMainInfo.module.css";

// import Logo from "../../components/Logo/Logo";
// import AddWaterBtn from "./AddWaterBtn/AddWaterBtn";
// import WaterDailyNorma from "./WaterDailyNorma/WaterDailyNorma";
// import WaterProgressBar from "./WaterProgressBar/WaterProgressBar";

// const WaterMainInfoSection = () => {
//   return (
//     <div className={css.infoContainer}>
//       <Logo />
//       <div className={css.imgInfoContainer}></div>

import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import Logo from '../Logo/Logo';
import WaterDailyNorma from '../WaterDailyNorma/WaterDailyNorma';
import WaterProgressBar from '../WaterProgressBar/WaterProgressBar';
import css from './WaterMainInfo.module.css';

const WaterMainInfo = () => {
  return (
    <div className={css.trackContainerItem}>
      <Logo />

      <WaterDailyNorma />
      <WaterProgressBar />
      <AddWaterBtn />
    </div>
  );
};

// export default WaterMainInfoSection;

export default WaterMainInfo;
