import * as yup from 'yup';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import css from './Form.module.css';

import sprite from '../assets/images/svg/symbol-defs.svg';
import { changePassword } from '../redux/users/operations.js';

const schema = yup.object().shape({
  password: yup
    .string()
    .required('Password field is required')
    .min(6, 'Password must contain at least 6 characters'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password field is required')
    .min(6, 'Password must contain at least 6 characters'),
});

const options = {
  position: 'top-center',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const RenewPasswordForm = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const token = params.get('token');

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const handleBlur = async fieldName => {
    await trigger(fieldName);
  };

  const onSubmit = async data => {
    const userData = { ...data };
    delete userData.repeatPassword;
    if (token) {
      dispatch(changePassword({ userData, token }));
      reset();
      navigate('/signin');
    } else {
      console.error('Token is missing', { ...options });
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <label className={css.label}>{t('renewForm.new')}</label>
      <div className={css.input_field}>
        <input
          className={`${css.input} ${errors.password ? css.error : ''}`}
          type={showPassword ? 'text' : 'password'}
          {...register('password')}
          placeholder={t('renewForm.placeholderPassword')}
          name="password"
          onBlur={() => handleBlur('password')}
        />
        {errors.password && (
          <span className={css.errors}>{errors.password.message}</span>
        )}
        {!showPassword ? (
          <svg
            className={css.icon_eye}
            onClick={() => setShowPassword(!showPassword)}
          >
            <use width={20} height={20} xlinkHref={`${sprite}#eye-off`}></use>
          </svg>
        ) : (
          <svg
            className={css.eyeIconOff}
            onClick={() => setShowPassword(!showPassword)}
          >
            <use width={20} height={20} xlinkHref={`${sprite}#eye`}></use>
          </svg>
        )}
      </div>

      <label className={css.label}>{t('renewForm.confirm')}</label>
      <div className={css.input_field}>
        <input
          className={`${css.input} ${errors.repeatPassword ? css.error : ''}`}
          type={showPassword ? 'text' : 'password'}
          {...register('repeatPassword')}
          placeholder={t('renewForm.placeholderRepeatPassword')}
          name="repeatPassword"
          onBlur={() => handleBlur('repeatPassword')}
        />
        {errors.repeatPassword && (
          <span className={css.errors}>{errors.repeatPassword.message}</span>
        )}
        {!showPassword ? (
          <svg
            className={css.icon_eye}
            onClick={() => setShowPassword(!showPassword)}
          >
            <use width={20} height={20} xlinkHref={`${sprite}#eye-off`}></use>
          </svg>
        ) : (
          <svg
            className={css.eyeIconOff}
            onClick={() => setShowPassword(!showPassword)}
          >
            <use width={20} height={20} xlinkHref={`${sprite}#eye`}></use>
          </svg>
        )}
      </div>

      <button
        className={css.button}
        type="submit"
        disabled={!isDirty || !isValid}
      >
        {t('renewForm.send')}
      </button>
    </form>
  );
};

export default RenewPasswordForm;
