import Logo from '../Logo/Logo';
import css from './WelcomeSection.module.css';
import { Navigation } from '../Navigation/Navigation';

const WelcomeSection = () => {
  return (
    <div className={css.welcomeBox}>
      <Logo />
      <div>
        <p className={css.welcomePhrase}>Record daily water intake and track</p>
        <h1 className={css.welcomeName}>Water consumption tracker</h1>
        <Navigation />
      </div>
    </div>
  );
};

export default WelcomeSection;
