import { Helmet } from 'react-helmet-async';
// import Logo from '../../components/Logo/Logo';
import SignInForm from '../../components/SignInForm/SignInForm';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../../redux/users/selectors';
import Loader from '../../components/Loader/Loader';
import css from '../SignIn/SignInPage.module.css';

const SignIn = () => {
  const loading = useSelector(selectIsLoading);
  return (
    <>
      {loading && <Loader />}
      <Helmet>
        <title>SignIn</title>
      </Helmet>
      <div className={css.generalSignInForm}>
        <SignInForm />
        <div className={css.AdvantagesSection_plus}>
          <AdvantagesSection />
        </div>
      </div>
    </>
  );
};

export default SignIn;
