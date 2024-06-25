import css from './SignInForm.module.css';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/users/operations';
import { useState } from 'react';
import sprite from '../../assets/images/svg/symbol-defs.svg';
import toast from 'react-hot-toast';
import Notification from '../Notification/Notification';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email field is required'),
  password: yup
    .string()
    .required('Password field is required')
    .min(6, 'Password must contain at least 6 characters'),
});

const SignInForm = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={css.loginContainer}>
      {<Logo />}
      <div className={css.formContainer}>
        <h1 className={css.title}>Sign In</h1>
        <form
          className={css.form}
          onSubmit={handleSubmit(async data => {
            try {
              const resultAction = await dispatch(logIn(data));

              if (logIn.fulfilled.match(resultAction)) {
                // toast.success('You were successfully signed in!');
                <Notification
                  type="success"
                  message="You were successfully signed in!"
                />;
                reset();
              } else if (logIn.rejected.match(resultAction)) {
                // toast.error('Something went wrong. Please try again.');
                <Notification
                  type="error"
                  message="Something went wrong. Please try again."
                />;
              }
            } catch (error) {
              // toast.error('Unexpected error. Please try again.');
              <Notification
                type="error"
                message="Unexpected error. Please try again."
              />;
            }
          })}
        >
          <label className={css.label}>Email</label>
          <div className={css.input_field}>
            <input
              className={`${css.input} ${errors.email ? css.error : ''}`}
              required={true}
              type="email"
              {...register('email', {
                pattern: {
                  value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: 'Please enter valid email',
                },
              })}
              placeholder="Enter your email"
              autoComplete="on"
            />
            {errors.email && (
              <span className={css.errors}>{errors.email.message}</span>
            )}
          </div>
          <label className={css.label}>Password</label>
          <div className={css.input_field}>
            <input
              className={`${css.input} ${errors.password ? css.error : ''}`}
              required={true}
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              placeholder="Enter your password"
            />
            {errors.password && (
              <span className={css.errors}>{errors.password.message}</span>
            )}
            {!showPassword && (
              <svg
                className={css.icon_eye}
                onClick={() => setShowPassword(!showPassword)}
              >
                <use
                  width={20}
                  height={20}
                  xlinkHref={`${sprite}#eye-off`}
                ></use>
              </svg>
            )}

            {showPassword && (
              <svg
                className={css.eyeIconOff}
                onClick={() => setShowPassword(!showPassword)}
              >
                <use width={20} height={20} xlinkHref={`${sprite}#eye`}></use>
              </svg>
            )}
          </div>

          <button className={css.button} type="submit">
            Sign In
          </button>
        </form>
        <p className={css.description}>
          Don’t have an account?&nbsp;
          <NavLink className={css.link} to={'/signup'}>
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  );
};
export default SignInForm;
