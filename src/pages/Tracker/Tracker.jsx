import { Helmet } from 'react-helmet-async';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import css from './Tracker.module.css';

// import { fetchWaters } from '../../redux/water/operations';
// import { requestWaterInfo } from '../../services/waterApi';

const Tracker = () => {
  // const tryWater = () => {
  //   console.log('Hello');
  //   requestWaterInfo();
  //   fetchWaters();
  // };
  return (
    <div className={css.trackContainer}>
      <Helmet>
        <title>Tracker</title>
      </Helmet>

      <WaterMainInfo />
      {/* <button onClick={tryWater}>try water</button> */}
      <WaterDetailedInfo />
    </div>
  );
};

export default Tracker;
