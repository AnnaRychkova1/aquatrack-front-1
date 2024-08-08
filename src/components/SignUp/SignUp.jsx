import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import css from '../../shared/style/Section/Section.module.css';
import Section from '../../shared/style/Section/Section';
import GoogleBtn from '../../shared/components/GoogleBtn/GoogleBtn';
import SignUpForm from '../../forms/SignUpForm';

const SignUp = () => {
  const { t } = useTranslation();
  return (
    <Section>
      <div className={css.content}>
        <p className={css.title}>{t('signupForm.signup')}</p> <SignUpForm />
        <GoogleBtn type="Up" />
        <p className={css.description}>
          {t('signupForm.haveAccount')}?&nbsp;
          <Link className={css.link} to={'/signin'}>
            {t('signupForm.signin')}
          </Link>
        </p>
        <p className={css.description}>
          {t('signupForm.resendVerify')}?&nbsp;
          <Link className={css.link} to={`/forgot?operationType=verify`}>
            {t('signupForm.reverify')}
          </Link>
        </p>
      </div>
    </Section>
  );
};

export default SignUp;
