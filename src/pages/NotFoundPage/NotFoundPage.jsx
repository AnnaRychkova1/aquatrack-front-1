import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import css from './NotFoundPages.module.css';
import Page from '../../shared/style/Page/Page';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <Page>
      <Helmet>
        <title>{t('pages.notFound')}</title>
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

export default NotFoundPage;
