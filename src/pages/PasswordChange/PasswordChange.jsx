import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../../redux/users/selectors';
import Loader from '../../components/Loader/Loader';
import css from './PasswordChange.module.css';
import { useTranslation } from 'react-i18next';
import PasswordChangeForm from '../../components/PasswordChangeForm/PasswordChangeForm';

const PasswordChange = () => {
  const loading = useSelector(selectIsLoading);
  const { t } = useTranslation();
  return (
    <>
      {loading && <Loader />}
      <Helmet>
        <title>
          {t(
            // 'pages.signup'
            'Password change'
          )}
        </title>
      </Helmet>
      <div className={css.generalSignInForm}>
        <PasswordChangeForm />
      </div>
    </>
  );
};

export default PasswordChange;
