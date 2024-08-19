import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import css from './Form.module.css';
import sprite from '../assets/images/svg/symbol-defs.svg';
import { logIn } from '../redux/users/operations';
import { selectIsError, selectIsLoading } from '../redux/users/selectors';
import Loader from '../shared/components/Loader/Loader';
import ErrorPage from '../pages/ErrorPage';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter valid email')
    .required('Email field is required'),
  password: Yup.string()
    .required('Password field is required')
    .min(6, 'Password must contain at least 6 characters'),
});

const SignInForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
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

  if (loading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
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
            <use width={20} height={20} xlinkHref={`${sprite}#eye-off`}></use>
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
  );
};
export default SignInForm;
