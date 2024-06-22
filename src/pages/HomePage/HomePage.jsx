import { Helmet } from 'react-helmet-async';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={css.generalHomePage}>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <WelcomeSection />
      <AdvantagesSection />
    </div>
  );
};

export default HomePage;
