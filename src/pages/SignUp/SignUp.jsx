import { Helmet } from 'react-helmet-async';
import SignUpForm from '..//../components/SignUpForm/SignUpForm';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../../redux/users/selectors';
import Loader from '../../components/Loader/Loader';
import css from './SignUpPage.module.css';
import { useTranslation } from 'react-i18next';

const SignUp = () => {
  const loading = useSelector(selectIsLoading);
  const { t } = useTranslation();
  return (
    <>
      {loading && <Loader />}
      <Helmet>
        <title>{t('pages.signup')}</title>
      </Helmet>
      <div className={css.generalSignInForm}>
        <SignUpForm />
        <div className={css.AdvantagesSection_plus}>
          <AdvantagesSection />
        </div>
      </div>
    </>
  );
};

export default SignUp;
