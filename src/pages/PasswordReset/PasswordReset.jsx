import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../../redux/users/selectors';
import Loader from '../../components/Loader/Loader';
import css from './PasswordReset.module.css';
import { useTranslation } from 'react-i18next';
import PasswordForm from '../../components/PasswordForm/PasswordForm';

const PasswordReset = () => {
  const loading = useSelector(selectIsLoading);
  const { t } = useTranslation();
  return (
    <>
      {loading && <Loader />}
      <Helmet>
        <title>
          {t(
            // 'pages.signin'
            'Password reset'
          )}
        </title>
      </Helmet>
      <div className={css.generalSignInForm}>
        <PasswordForm />
      </div>
    </>
  );
};

export default PasswordReset;
