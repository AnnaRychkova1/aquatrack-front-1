import { Helmet } from 'react-helmet-async';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import css from './Tracker.module.css';
import WaterForm from '../../modals/WaterForm/WaterForm';

const Tracker = () => {
  return (
    <div className={css.trackContainer}>
      <Helmet>
        <title>Tracker</title>
      </Helmet>

      <WaterMainInfo />
      <WaterDetailedInfo />
      <WaterForm/>
    </div>
  );
};

export default Tracker;
