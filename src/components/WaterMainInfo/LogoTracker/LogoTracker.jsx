import { Link } from 'react-router-dom';
import css from './LogoTracker.module.css';
const LogoTracker = () => {
  return (
    <Link to="/" className={css.logo}>
      AQUATRACK
    </Link>
  );
};
export default LogoTracker;
