// import { Helmet } from "react-helmet-async";
// import { Link } from "react-router-dom";
// import Logo from "../../components/Logo/Logo";
// import SignUpForm from "../../components/SignUpForm/SignUpForm";

// const SignUp = () => {
//   return (
//     <>
//       <Helmet>
//         <title>SignUp</title>
//       </Helmet>
//       <Logo />
//       <SignUpForm />
//       <p>
//         Already have account?
//         <Link to="/signin">Sign In</Link>
//       </p>
//     </>
//   );
// };

// export default SignUp;

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
