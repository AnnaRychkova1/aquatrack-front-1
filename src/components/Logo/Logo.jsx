import { Link } from 'react-router-dom';
import css from './Logo.module.css';
const Logo = () => {
  return (
    <Link to="/tracker" className={css.logoFont}>
      AQUATRACK
    </Link>
  );
};
export default Logo;
