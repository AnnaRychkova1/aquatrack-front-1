// import { Helmet } from "react-helmet-async";
// import { Link } from "react-router-dom";
// import Logo from "../../components/Logo/Logo";
// import SignInForm from "../../components/SignInForm/SignInForm";

// const SignIn = () => {
//   return (
//     <>
//       <Helmet>
//         <title>SignIn</title>
//       </Helmet>
//       <Logo />
//       <SignInForm />
//       <p>
//         Don’t have an account?
//         <Link to="/signup">Sign Up</Link>
//       </p>
//     </>
//   );
// };

//export default SignIn;

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import SignInForm from '../../components/SignInForm/SignInForm';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import css from '../SignIn/SignInPage.module.css';

const SignIn = () => {
  return (
    <>
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
