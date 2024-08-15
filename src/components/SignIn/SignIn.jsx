import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import css from '../../shared/style/Section/Section.module.css';
import Section from '../../shared/style/Section/Section';
import GoogleBtn from '../../shared/components/GoogleBtn/GoogleBtn';
import SignInForm from '../../forms/SignInForm';

const SignIn = () => {
  const { t } = useTranslation();
  /////////add for google

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');

    if (token) {
      localStorage.setItem('token', token);
      navigate('/tracker');
    }
  }, [location, navigate]);

  ///////
  return (
    <Section>
      <div className={css.content}>
        <h1 className={css.title}>{t('signinForm.signin')}</h1>
        <SignInForm />
        <GoogleBtn type="In" />
        <p className={css.description}>
          {t('signinForm.dontAccount')}?&nbsp;
          <Link className={css.link} to={'/signup'}>
            {t('signinForm.signup')}
          </Link>
        </p>
        <p className={css.description}>
          {t('signinForm.forgot')}
          ?&nbsp;
          <Link to={`/forgot?operationType=password`} className={css.link}>
            {t('signinForm.renew')}
          </Link>
        </p>
      </div>
    </Section>
  );
};

export default SignIn;
