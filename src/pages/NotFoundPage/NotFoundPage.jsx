import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import css from './NotFoundPage.module.css';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className={css.generalHomePage}>
      <Helmet>
        <title>{t('pages.notFound')}</title>
      </Helmet>
      <div className={css.formContainer}>
        <p className={css.textPage}> {t('notFound.sorry')}</p>
        <button className={css.btnPage}>
          <Link to="/">{t('notFound.back')}</Link>
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
