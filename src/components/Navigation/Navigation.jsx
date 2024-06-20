import { Link } from "react-router-dom";

import css from "./Navigation.module.css";

export const Navigation = () => {
  return (
    <nav className={css.navigation}>
      <Link className={css.navlink} to="/tracker">
        Try tracker
      </Link>
      <Link className={css.navlink} to="/signin">
        Sign In
      </Link>
    </nav>
  );
};
