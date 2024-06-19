import { NavLink } from "react-router-dom";
import clsx from "clsx";

// import { useAuth } from "../../hooks";
import css from "./Navigation.module.css";

export const Navigation = () => {
  //   const { isSignedIn } = useAuth();
  const isSignedIn = false;
  const getNavLinkClassNames = ({ isActive }) =>
    clsx(css.headerLink, {
      [css.active]: isActive,
    });

  return (
    <nav className={css.navigation}>
      <NavLink className={getNavLinkClassNames} to="/">
        Home
      </NavLink>
      {isSignedIn && (
        <NavLink className={getNavLinkClassNames} to="/tracker"></NavLink>
      )}
    </nav>
  );
};
