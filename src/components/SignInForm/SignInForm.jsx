import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/users/operations';
import { useState } from 'react';
import sprite from '../../assets/images/svg/symbol-defs.svg';
import css from './SignInForm.module.css';
import { useTranslation } from 'react-i18next';

import GoogleBtn from '../GoogleBtn/GoogleBtn';
import { useLocation, useNavigate } from 'react-router-dom';

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
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleFocus = fieldName => clearErrors(fieldName);

  const onSubmit = data => {
    dispatch(logIn(data));
    reset();
  };

  return (
    <div className={css.loginContainer}>
      {<Logo />}
      <div className={css.formContainer}>
        <h1 className={css.title}>{t('signinForm.signin')}</h1>
        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <label className={css.label}>{t('signinForm.email')}</label>
          <div className={css.input_field}>
            <input
              className={`${css.input} ${errors.email ? css.error : ''}`}
              type="email"
              {...register('email', {
                pattern: {
                  value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: 'Please enter valid email',
                },
              })}
              placeholder={t('signinForm.placeholderEmail')}
              autoComplete="on"
              onFocus={() => handleFocus('email')}
            />
            {errors.email && (
              <span className={css.errors}>{errors.email.message}</span>
            )}
          </div>
          <label className={css.label}>{t('signinForm.password')}</label>
          <div className={css.input_field}>
            <input
              className={`${css.input} ${errors.password ? css.error : ''}`}
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              placeholder={t('signinForm.placeholderPassword')}
              onFocus={() => handleFocus('password')}
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
            {t('signinForm.signin')}
          </button>
        </form>

        <GoogleBtn type="In" />

        <p className={css.description}>
          {t('signinForm.dontAccount')}?&nbsp;
          <NavLink className={css.link} to={'/signup'}>
            {t('signinForm.signup')}
          </NavLink>
        </p>
      </div>
    </div>
  );
};
export default SignInForm;
