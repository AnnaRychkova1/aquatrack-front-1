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

import css from './SignUpPage.module.css';

import SignUpForm from '..//../components/SignUpForm/SignUpForm';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import React from 'react';
import { Helmet } from 'react-helmet-async';

const SignUp = () => {
  return (
    <>
      <Helmet>
        <title>SignUp</title>
      </Helmet>
      <div className={css.signUpPageWrapper}>
        <SignUpForm />
        <div className={css.AdvantagesSection_up}>
          <AdvantagesSection />
        </div>
      </div>
    </>
  );
};

export default SignUp;
