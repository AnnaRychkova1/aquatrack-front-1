import { Link } from 'react-router-dom';

import css from './Navigation.module.css';

export const Navigation = () => {
  return (
    <nav className={css.welcomeButton_block}>
      <Link to="/tracker" className={css.welcomeButton_tracker}>
        Try tracker
      </Link>
      <Link to="/signin" className={css.welcomeButton_sign}>
        Sign In
      </Link>
    </nav>
  );
};
