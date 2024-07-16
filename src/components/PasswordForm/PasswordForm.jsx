import Logo from '../Logo/Logo';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import css from './PasswordForm.module.css';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { newPassword } from '../../redux/users/operations';
import { useNavigate } from 'react-router-dom'; 

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email field is required'),
});

const PasswordForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
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

  const onSubmit = data => {
    dispatch(newPassword(data));
    reset();
    navigate('/'); 
  };

  return (
    <div className={css.loginContainer}>
      {<Logo />}
      <div className={css.formContainer}>
        <h1 className={css.title}>
          {t(
            // 'signinForm.signin'
            'Password reset'
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
export default PasswordForm;
