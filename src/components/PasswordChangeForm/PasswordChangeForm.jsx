import Logo from '../Logo/Logo';
import * as yup from 'yup';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import css from './PasswordChangeForm.module.css';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { logIn } from '../../redux/users/operations';
import {newPasswordChange} from '../../redux/users/operations';
import { useNavigate } from 'react-router-dom';
import sprite from '../../assets/images/svg/symbol-defs.svg';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email field is required'),
  password: yup
    .string()
    .required('Password field is required')
    .min(6, 'Password must contain at least 6 characters'),
  newpassword: yup
    .string()
    .required('Password field is required')
    .min(6, 'Password must contain at least 6 characters'),
});

const PasswordChangeForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

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
    },
  });

  const handleFocus = fieldName => clearErrors(fieldName);
/**************************************************************************************** */
  // const onSubmit = data => {
  //   dispatch(logIn(data)); // перевіряєм чи правильно користувач ввів данні
  //   reset();
  //   dispatch(newPasswordChange(data)); // треба оновити пароль на новий
  //   navigate('/signin');
  // };
  const onSubmit = async data => {
    try {
      await dispatch(logIn(data)); // перевіряємо, чи правильно користувач ввів дані
      reset();
      await dispatch(newPasswordChange(data)); // оновлюємо пароль на новий
      navigate('/signin');
    } catch (error) {
      console.error('Error during login or password change:', error);
      //  показати користувачу повідомлення
    }
  };

/**************************************************************************************** */
  return (
    <div className={css.loginContainer}>
      {<Logo />}
      <div className={css.formContainer}>
        <h1 className={css.title}>
          {t(
            // 'signinForm.signin'
            'Password change'
          )}
        </h1>
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

          <label className={css.label}>
            {t(
              // 'signinForm.password'
              'New password'
            )}
          </label>
          <div className={css.input_field}>
            <input
              className={`${css.input} ${errors.password ? css.error : ''}`}
              type={showPassword ? 'text' : 'password'}
              {...register('newpassword')}
              placeholder={t(
                // 'signinForm.placeholderPassword'
                "Enter a new password"
              )}
              onFocus={() => handleFocus('newpassword')}
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
            {t(
              // 'signinForm.signin'
              'Send'
            )}
          </button>
        </form>

        <p className={css.description}>
          {t(
            'Go to the main page'
            // 'signinForm.dontAccount'
          )}
          ?&nbsp;
          <NavLink className={css.link} to={'/'}>
            {t(
              'Home Page'
              // 'signinForm.signup'
            )}
          </NavLink>
        </p>
      </div>
    </div>
  );
};
export default PasswordChangeForm;
