import css from "./AppBar.module.css";

// import { useAuth } from "../../hooks";
import { Navigation } from "../Navigation/Navigation";
import { UserMenu } from "../UserMenu/UserMenu";
import { AuthNav } from "../AuthNav/AuthNav";

export const AppBar = () => {
  //   const { isSignedIn } = useAuth();
  const isSignedIn = false;
  return (
    <header className={css.header}>
      <Navigation />
      {isSignedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
};
