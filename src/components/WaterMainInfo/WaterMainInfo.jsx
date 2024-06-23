import css from "./WaterMainInfo.module.css";

import Logo from "../../components/Logo/Logo";
import AddWaterBtn from "./AddWaterBtn/AddWaterBtn";
import WaterDailyNorma from "./WaterDailyNorma/WaterDailyNorma";
import WaterProgressBar from "./WaterProgressBar/WaterProgressBar";

const WaterMainInfoSection = () => {
  return (
    <div className={css.infoContainer}>
      <Logo />
      <div className={css.imgInfoContainer}></div>

      <WaterDailyNorma />
      <WaterProgressBar />
      <AddWaterBtn />
    </div>
  );
};

export default WaterMainInfoSection;
