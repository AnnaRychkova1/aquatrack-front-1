import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import SignUpForm from "../../components/SignUpForm/SignUpForm";

const SignUp = () => {
  return (
    <>
      <Helmet>
        <title>SignIn</title>
      </Helmet>
      <Logo />
      <SignUpForm />
      <p>
        Already have account?
        <Link to="/signin">Sign In</Link>
      </p>
    </>
  );
};

export default SignUp;
