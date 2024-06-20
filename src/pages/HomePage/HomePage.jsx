import { Helmet } from "react-helmet-async";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <WelcomeSection />
      <AdvantagesSection />
    </div>
  );
};

export default Home;
