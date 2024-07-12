import { useTranslation } from 'react-i18next';
import css from './Logo.module.css';
const Logo = () => {
  const { t } = useTranslation();
  return <span className={css.logoFont}>{t('logo.logo')}</span>;
};
export default Logo;
