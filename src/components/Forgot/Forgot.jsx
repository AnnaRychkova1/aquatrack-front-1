import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import css from '../../shared/style/Section/Section.module.css';

import { useEffect, useState } from 'react';
import ForgotForm from '../../forms/ForgotForm';
import Section from '../../shared/style/Section/Section';

const Forgot = ({ operationType }) => {
  const { t } = useTranslation();

  const [typePassword, setTypePassword] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [shownBtn, setShownBtn] = useState(true);

  const automatically = () => {
    setTypePassword('automatically');
    setShowForm(true);
    setShownBtn(false);
  };
  const manual = () => {
    setTypePassword('manual');
    setShowForm(true);
    setShownBtn(false);
  };

  useEffect(() => {
    if (operationType === 'verify') {
      setShowForm(true);
    }
  }, [operationType]);

  return (
    <Section>
      <div className={css.content}>
        <h3 className={css.title}>
          {operationType === 'password'
            ? t('forgotForm.resetPassword')
            : t('forgotForm.resetVerify')}
        </h3>
        {operationType === 'password' && shownBtn && (
          <>
            <button
              className={css.typePasswordBtn}
              type="button"
              onClick={automatically}
            >
              Generare new password automatically
            </button>
            <button
              className={css.typePasswordBtn}
              type="button"
              onClick={manual}
            >
              Generare new password manual
            </button>
          </>
        )}
        {showForm && (
          <ForgotForm
            operationType={operationType}
            typePassword={typePassword}
          />
        )}

        <p className={css.description}>
          {t('forgotForm.toMain')}
          ?&nbsp;
          <Link className={css.link} to={'/'}>
            {t('forgotForm.home')}
          </Link>
        </p>
      </div>
    </Section>
  );
};
export default Forgot;
