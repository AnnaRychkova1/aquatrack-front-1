import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import css from '../../shared/style/Section/Section.module.css';
import RenewPasswordForm from '../../forms/RenewPasswordForm';
import Section from '../../shared/style/Section/Section';

const RenewPassword = () => {
  const { t } = useTranslation();
  return (
    <Section>
      <div className={css.content}>
        <h1 className={css.title}>{t('renewForm.change')}</h1>
        <RenewPasswordForm />
        <p className={css.description}>
          {t('renewForm.toMain')}
          ?&nbsp;
          <Link className={css.link} to={'/'}>
            {t('renewForm.home')}
          </Link>
        </p>
      </div>
    </Section>
  );
};

export default RenewPassword;
