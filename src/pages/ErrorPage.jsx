import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import css from './MissingPages.module.css';
import Page from '../shared/style/Page/Page';

const ErrorPage = ({ message = '' }) => {
  const { t } = useTranslation();
  return (
    <Page>
      <Helmet>
        <title>{t('pages.error')}</title>
      </Helmet>
      <section className={css.container}>
        <p className={css.textPage}>
          {message.length > 0 ? message : t('error.sorry')}
        </p>
      </section>
    </Page>
  );
};

export default ErrorPage;
