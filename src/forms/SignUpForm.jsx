import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import css from './Form.module.css';
import { userRegister } from '../redux/users/operations';
import sprite from '../assets/images/svg/symbol-defs.svg';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email field is required'),
  password: yup
    .string()
    .required('Password field is required')
    .min(6, 'Password must contain at least 6 characters'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Repeat Password field is required'),
});

const SignUpForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const formData = {
    email: '',
    password: '',
    repeatPassword: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData,
    mode: 'onTouched',
  });

  const onSubmit = data => {
    const userData = { ...data };
    delete userData.repeatPassword;
    dispatch(userRegister(userData));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <label className={css.label}>{t('signupForm.email')}</label>
      <div className={css.input_field}>
        <input
          className={`${css.input} ${errors.email ? css.error : ''}`}
          type="text"
          {...register('email')}
          placeholder={t('signupForm.placeholderEmail')}
          name="email"
        />
        {errors.email && (
          <span className={css.errors}>{errors.email.message}</span>
        )}
      </div>
      <label className={css.label}>{t('signupForm.password')}</label>
      <div className={css.input_field}>
        <input
          className={`${css.input} ${errors.password ? css.error : ''}`}
          type={showPassword ? 'text' : 'password'}
          {...register('password')}
          placeholder={t('signupForm.placeholderPassword')}
          name="password"
        />
        {errors.password && (
          <span className={css.errors}>{errors.password.message}</span>
        )}
        <svg
          className={showPassword ? css.eyeIconOff : css.icon_eye}
          onClick={() => setShowPassword(!showPassword)}
        >
          <use
            width={20}
            height={20}
            xlinkHref={`${sprite}${showPassword ? '#eye' : '#eye-off'}`}
          ></use>
        </svg>
      </div>
      <label className={css.label}>{t('signupForm.repeat')}</label>
      <div className={css.input_field}>
        <input
          className={`${css.input} ${errors.repeatPassword ? css.error : ''}`}
          type={showPassword ? 'text' : 'password'}
          {...register('repeatPassword')}
          placeholder={t('signupForm.placeholderPasswordRepeat')}
          name="repeatPassword"
        />
        {errors.repeatPassword && (
          <span className={css.errors}>{errors.repeatPassword.message}</span>
        )}
        <svg
          className={showPassword ? css.eyeIconOff : css.icon_eye}
          onClick={() => setShowPassword(!showPassword)}
        >
          <use
            width={20}
            height={20}
            xlinkHref={`${sprite}${showPassword ? '#eye' : '#eye-off'}`}
          ></use>
        </svg>
      </div>
      <button
        className={css.button}
        type="submit"
        disabled={!isDirty || !isValid}
      >
        {t('signupForm.signup')}
      </button>
    </form>
  );
};

export default SignUpForm;
