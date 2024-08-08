import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import css from './MissingPages.module.css';
import Page from '../shared/style/Page/Page';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  const { t } = useTranslation();
  return (
    <Page>
      <Helmet>
        <title>{t('pages.error')}</title>
      </Helmet>
      <section className={css.container}>
        <p className={css.textPage}> {t('notFound.sorry')}</p>
        <button className={css.btnPage}>
          <Link className={css.linkBack} to="/">
            {t('notFound.back')}
          </Link>
        </button>
      </section>
    </Page>
  );
};

export default ErrorPage;
