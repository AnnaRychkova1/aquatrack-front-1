import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import css from './Form.module.css';

import {
  forgotPassword,
  generatePassword,
  resendVerify,
} from '../redux/users/operations';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email field is required'),
});

const ForgotForm = ({ operationType, typePassword }) => {
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
    if (operationType === 'password') {
      if (typePassword === 'automatically') {
        dispatch(generatePassword(data));
      } else {
        dispatch(forgotPassword(data));
      }
      navigate('/signin');
    } else {
      dispatch(resendVerify(data));
      navigate('/');
    }
    reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <label className={css.label}>{t('forgotForm.email')}</label>
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
          placeholder={t('forgotForm.placeholderEmail')}
          autoComplete="on"
          onFocus={() => handleFocus('email')}
        />
        {errors.email && (
          <span className={css.errors}>{errors.email.message}</span>
        )}
      </div>

      <button className={css.button} type="submit">
        {t('forgotForm.send')}
      </button>
    </form>
  );
};
export default ForgotForm;
