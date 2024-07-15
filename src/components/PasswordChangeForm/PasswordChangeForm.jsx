import Logo from '../Logo/Logo';
import * as yup from 'yup';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import css from './PasswordChangeForm.module.css';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { newPasswordChange } from '../../redux/users/operations';
import { useNavigate } from 'react-router-dom';
import sprite from '../../assets/images/svg/symbol-defs.svg';

const schema = yup.object().shape({
  password: yup
    .string()
    .required('Password field is required')
    .min(6, 'Password must contain at least 6 characters'),
  newpassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
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
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const handleFocus = fieldName => clearErrors(fieldName);

  const handleBlur = async fieldName => {
    await trigger(fieldName);
  };

  const onSubmit = ({ password }) => {
    dispatch(newPasswordChange({ password }));
    reset();
    navigate('/signin');
  };

  return (
    <div className={css.loginContainer}>
      <Logo />
      <div className={css.formContainer}>
        <h1 className={css.title}>{t('Password change')}</h1>
        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <label className={css.label}>{t('New password')}</label>
          <div className={css.input_field}>
            <input
              className={`${css.input} ${errors.password ? css.error : ''}`}
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              placeholder={t('Enter a new password')}
              onFocus={() => handleFocus('password')}
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
                <use
                  width={20}
                  height={20}
                  xlinkHref={`${sprite}#eye-off`}
                ></use>
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

          <label className={css.label}>{t('Confirm new password')}</label>
          <div className={css.input_field}>
            <input
              className={`${css.input} ${errors.newpassword ? css.error : ''}`}
              type={showPassword ? 'text' : 'password'}
              {...register('newpassword')}
              placeholder={t('Enter the new password again')}
              onFocus={() => handleFocus('newpassword')}
              onBlur={() => handleBlur('newpassword')}
            />
            {errors.newpassword && (
              <span className={css.errors}>{errors.newpassword.message}</span>
            )}
            {!showPassword ? (
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
            ) : (
              <svg
                className={css.eyeIconOff}
                onClick={() => setShowPassword(!showPassword)}
              >
                <use width={20} height={20} xlinkHref={`${sprite}#eye`}></use>
              </svg>
            )}
          </div>

          <button className={css.button} type="submit">
            {t('Send')}
          </button>
        </form>

        <p className={css.description}>
          {t('Go to the main page')}
          ?&nbsp;
          <NavLink className={css.link} to={'/'}>
            {t('Home Page')}
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default PasswordChangeForm;
