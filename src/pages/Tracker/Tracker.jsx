import { Helmet } from 'react-helmet-async';
import Logo from '../../components/Logo/Logo';
import DailyInfo from '../../components/DailyInfo/DailyInfo';

// import UniversalModal from '../../modals/Modal/Modal';

const Tracker = () => {
  return (
    <>
      <Helmet>
        <title>Tracker</title>
      </Helmet>
      <Logo />
      <DailyInfo />
      {/* <UniversalModal /> */}
    </>
  );
};

export default Tracker;
