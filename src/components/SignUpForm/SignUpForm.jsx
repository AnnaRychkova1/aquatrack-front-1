import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { userRegister } from '../../redux/users/operations';
import { useState } from 'react';
import sprite from '../../assets/images/svg/symbol-defs.svg';
import css from './SignUpForm.module.css';
import { useTranslation } from 'react-i18next';

import GoogleBtn from '../GoogleBtn/GoogleBtn';

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
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    repeatPassword: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData,
    mode: 'onBlur',
  });

  const handleFocus = fieldName => clearErrors(fieldName);

  const onSubmit = data => {
    const {
      // repeatPassword,
      ...userData
    } = data;
    dispatch(userRegister(userData));
    reset();
    setFormData({
      email: '',
      password: '',
      repeatPassword: '',
    });
  };

  return (
    <div className={css.loginContainer}>
      <Logo />

      <div className={css.formContainer}>
        <p className={css.title}>{t('signupForm.signup')}</p>
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <label className={css.label}>{t('signupForm.email')}</label>
          <div className={css.input_field}>
            <input
              className={`${css.input} ${errors.email ? css.error : ''}`}
              type="email"
              {...register('email')}
              placeholder={t('signupForm.placeholderEmail')}
              autoComplete="on"
              onChange={e =>
                setFormData({ ...formData, email: e.target.value })
              }
              value={formData.email}
              onFocus={() => handleFocus('email')}
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
              onChange={e =>
                setFormData({ ...formData, password: e.target.value })
              }
              value={formData.password}
              onFocus={() => handleFocus('password')}
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
              className={`${css.input} ${
                errors.repeatPassword ? css.error : ''
              }`}
              type={showPassword ? 'text' : 'password'}
              {...register('repeatPassword')}
              placeholder={t('signupForm.placeholderPasswordRepeat')}
              onChange={e =>
                setFormData({ ...formData, repeatPassword: e.target.value })
              }
              value={formData.repeatPassword}
              onFocus={() => handleFocus('repeatPassword')}
            />
            {errors.repeatPassword && (
              <span className={css.errors}>
                {errors.repeatPassword.message}
              </span>
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
          <button className={css.button} type="submit">
            {t('signupForm.signup')}
          </button>
        </form>

        <GoogleBtn type="In" />

        <p className={css.description}>
          {t('signupForm.haveAccount')}?&nbsp;
          <Link className={css.link} to={'/signin'}>
            {t('signupForm.signin')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;

/**====================================================== */
// import { Link, useNavigate } from 'react-router-dom';
// import Logo from '../Logo/Logo';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useForm } from 'react-hook-form';
// import { useDispatch } from 'react-redux';
// import { userRegister } from '../../redux/users/operations';
// import { useState } from 'react';
// import sprite from '../../assets/images/svg/symbol-defs.svg';
// import Notification from '../Notification/Notification';
// import css from './SignUpForm.module.css';

// const schema = yup.object().shape({
//   email: yup
//     .string()
//     .email('Please enter valid email')
//     .required('Email field is required'),
//   password: yup
//     .string()
//     .required('Password field is required')
//     .min(6, 'Password must contain at least 6 characters'),
//   repeatPassword: yup
//     .string()
//     .oneOf([yup.ref('password'), null], 'Some error password')
//     .required('Repeat Password field is required'),
// });

// const SignUpForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     repeatPassword: '',
//   });

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({
//     resolver: yupResolver(schema),
//     defaultValues: formData,
//     mode: 'onBlur',
//   });

//   const onSubmit = data => {
//     const { repeatPassword, ...userData } = data;
//     // dispatch(userRegister(userData)).then(() => {
//     //   navigate('/signin');
//     // });

//     // dispatch(userRegister(userData)).then(() => {
//     //   navigate('/tracker');
//     // });

//     dispatch(userRegister(userData));
//     reset();
//     setFormData({
//       email: '',
//       password: '',
//       repeatPassword: '',
//     });
//   };

//   return (
//     <div className={css.loginContainer}>
//       <Logo />

//       <div className={css.formContainer}>
//         <p className={css.title}>Sign Up</p>
//         <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
//           <label className={css.label}>Email</label>
//           <div className={css.input_field}>
//             <input
//               className={`${css.input} ${errors.email ? css.error : ''}`}
//               type="email"
//               {...register('email')}
//               placeholder="Enter your email"
//               autoComplete="on"
//               onChange={e =>
//                 setFormData({ ...formData, email: e.target.value })
//               }
//               value={formData.email}

//             />
//             {errors.email && (
//               <span className={css.errors}>{errors.email.message}</span>
//               //<Notification type="error" message={errors.email.message} />
//             )}
//           </div>
//           <label className={css.label}>Password</label>
//           <div className={css.input_field}>
//             <input
//               className={`${css.input} ${errors.password ? css.error : ''}`}
//               type={showPassword ? 'text' : 'password'}
//               {...register('password')}
//               placeholder="Enter your password"
//               onChange={e =>
//                 setFormData({ ...formData, password: e.target.value })
//               }
//               value={formData.password}

//             />
//             {errors.password && (
//               <span className={css.errors}>{errors.password.message}</span>
//               //<Notification type="error" message={errors.password.message} />
//             )}
//             <svg
//               className={showPassword ? css.eyeIconOff : css.icon_eye}
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               <use
//                 width={20}
//                 height={20}
//                 xlinkHref={`${sprite}${showPassword ? '#eye' : '#eye-off'}`}
//               ></use>
//             </svg>
//           </div>
//           <label className={css.label}>Repeat Password</label>
//           <div className={css.input_field}>
//             <input
//               className={`${css.input} ${
//                 errors.repeatPassword ? css.error : ''
//               }`}
//               type={showPassword ? 'text' : 'password'}
//               {...register('repeatPassword')}
//               placeholder="Repeat password"
//               onChange={e =>
//                 setFormData({ ...formData, repeatPassword: e.target.value })
//               }
//               value={formData.repeatPassword}

//             />
//             {errors.repeatPassword && (
//               <span className={css.errors}>
//                 {errors.repeatPassword.message}
//               </span>
//               // <Notification
//               //   type="error"
//               //   message={errors.repeatPassword.message}
//               // />
//             )}
//             <svg
//               className={showPassword ? css.eyeIconOff : css.icon_eye}
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               <use
//                 width={20}
//                 height={20}
//                 xlinkHref={`${sprite}${showPassword ? '#eye' : '#eye-off'}`}
//               ></use>
//             </svg>
//           </div>
//           <button className={css.button} type="submit">
//             Sign Up
//           </button>
//         </form>
//         <p className={css.description}>
//           Already have an account?&nbsp;
//           <Link className={css.link} to={'/signin'}>
//             Sign In
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignUpForm;
