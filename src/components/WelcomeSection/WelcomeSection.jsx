import Iconsvg from "../Icon/Icon";
import Logo from "../Logo/Logo";
import { Navigation } from "../Navigation/Navigation";

const WelcomeSection = () => {
  return (
    <section>
      <Logo />
      <h1>Home page</h1>
      <p>WelcomeSection</p>
      <Navigation />
      {/* <Iconsvg width="28" height="28" iconName="close" c /> */}
    </section>
  );
};

export default WelcomeSection;
