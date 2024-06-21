// import { Helmet } from "react-helmet-async";
// import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";
// import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";

// const Home = () => {
//   return (
//     <div>
//       <Helmet>
//         <title>Home</title>
//       </Helmet>
//       <WelcomeSection />
//       <AdvantagesSection />
//     </div>
//   );
// };

// export default Home;

import { Helmet } from "react-helmet-async";
import { AdvantagesSection } from "../../components/AdvantagesSection/AdvantagesSection";
import { WelcomeSection } from "../../components/WelcomeSection/WelcomeSection";
import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={css.generalHomePage}>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <WelcomeSection />
      <AdvantagesSection />
    </div>
  );
}
