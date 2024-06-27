import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { userRegister } from '../../redux/users/operations';
import { useState } from 'react';
import sprite from '../../assets/images/svg/symbol-defs.svg';
import Notification from '../Notification/Notification';
import css from './SignUpForm.module.css';

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
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData,
    mode: 'onBlur',
  });

  const onSubmit = data => {
    const { repeatPassword, ...userData } = data; // Exclude repeatPassword
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
        <p className={css.title}>Sign Up</p>
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <label className={css.label}>Email</label>
          <div className={css.input_field}>
            <input
              className={`${css.input} ${errors.email ? css.error : ''}`}
              type="email"
              {...register('email')}
              placeholder="Enter your email"
              autoComplete="on"
              onChange={e =>
                setFormData({ ...formData, email: e.target.value })
              }
              value={formData.email}
            />
            {errors.email && (
              // <span className={css.errors}>{errors.email.message}</span>
              <Notification type="error" message={errors.email.message} />
            )}
          </div>
          <label className={css.label}>Password</label>
          <div className={css.input_field}>
            <input
              className={`${css.input} ${errors.password ? css.error : ''}`}
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              placeholder="Enter your password"
              onChange={e =>
                setFormData({ ...formData, password: e.target.value })
              }
              value={formData.password}
            />
            {errors.password && (
              // <span className={css.errors}>{errors.password.message}</span>
              <Notification type="error" message={errors.password.message} />
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
          <label className={css.label}>Repeat Password</label>
          <div className={css.input_field}>
            <input
              className={`${css.input} ${
                errors.repeatPassword ? css.error : ''
              }`}
              type={showPassword ? 'text' : 'password'}
              {...register('repeatPassword')}
              placeholder="Repeat password"
              onChange={e =>
                setFormData({ ...formData, repeatPassword: e.target.value })
              }
              value={formData.repeatPassword}
            />
            {errors.repeatPassword && (
              // <span className={css.errors}>
              //   {errors.repeatPassword.message}
              // </span>
              <Notification
                type="error"
                message={errors.repeatPassword.message}
              />
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
            Sign Up
          </button>
        </form>
        <p className={css.description}>
          Already have an account?&nbsp;
          <Link className={css.link} to={'/signin'}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;

// import { Link } from 'react-router-dom';
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
//     .oneOf([yup.ref('password'), null], 'Passwords must match')
//     .required('Repeat Password field is required'),
// });

// const SignUpForm = () => {
//   const dispatch = useDispatch();
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
//     const { repeatPassword, ...userData } = data; // Exclude repeatPassword
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
//               <Notification type="error" message={errors.email.message} />
//             )}
//           </div>
//           <label className={css.label}>Password</label>
//           <div className={css.input_field}>
//             <input
//               className={`${css.input} ${
//                 errors.password || errors.repeatPassword ? css.error : ''
//               }`}
//               type={showPassword ? 'text' : 'password'}
//               {...register('password')}
//               placeholder="Enter your password"
//               onChange={e =>
//                 setFormData({ ...formData, password: e.target.value })
//               }
//               value={formData.password}
//             />
//             {errors.password && (
//               <Notification type="error" message={errors.password.message} />
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
//                 errors.repeatPassword
//                   ? css.error
//                   : errors.password
//                   ? css.error
//                   : ''
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
//               <Notification
//                 type="error"
//                 message={errors.repeatPassword.message}
//               />
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

// import { useDispatch } from 'react-redux';
// import { userRegister } from '../../redux/users/operations';
// <<<<<<< HEAD
// import { useId, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import * as Yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import clsx from 'clsx';
// =======
// import { useState } from 'react';
// import sprite from '../../assets/images/svg/symbol-defs.svg';
// >>>>>>> origin/main
// import css from './SignUpForm.module.css';

// const RegisterSchema = Yup.object().shape({
//   email: Yup.string().email('Invalid email').required('Required'),
//   password: Yup.string().min(6, 'Too short!').required('Required'),
//   repeatPassword: Yup.string()
//     .oneOf([Yup.ref('password'), null], 'Passwords must match')
//     .required('Required'),
// });

// const initialValues = {
//   email: '',
//   password: '',
//   repeatPassword: '',
// };

// const SignUpForm = () => {
//   const dispatch = useDispatch();

//   const [showPassword, setShowPassword] = useState(false);
// <<<<<<< HEAD
//   const [isFieldActivated, setIsFieldActivated] = useState({
//     email: false,
//     password: false,
//     repeatPassword: false,
// =======
//   const [showRepeatPassword, setRepeatPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     repeatPassword: '',
// >>>>>>> origin/main
//   });

//   const emailFieldId = useId();
//   const passwordFieldId = useId();
//   const repeatPasswordFieldId = useId();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     getValues,
//   } = useForm({
//     resolver: yupResolver(RegisterSchema),
//     defaultValues: initialValues,
//     mode: 'onChange',
//   });

// <<<<<<< HEAD
//   const onSubmit = values => {
//     dispatch(
//       userRegister({
//         email: values.email,
//         password: values.password,
//       })
//     );
// =======
//   const onSubmit = data => {
//     const { repeatPassword, ...userData } = data;
//     dispatch(userRegister(userData));
// >>>>>>> origin/main
//     reset();
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleActivate = field => {
//     setIsFieldActivated({ ...isFieldActivated, [field]: !!getValues(field) });
//   };

//   return (
//     <div className={css.loginContainer}>
//       {/* <Logo /> */}
//       <div className={css.formContainer}>
//         <p className={css.title}>Sign Up</p>

//         <form onSubmit={handleSubmit(onSubmit)} className={css.signUpFields}>
//           <div className={css.signUpFormInput}>
//             <label htmlFor={emailFieldId} className={css.fieldText}>
//               Email
//             </label>
//             <input
//               type="text"
//               id={emailFieldId}
//               placeholder="Enter your email"
//               className={clsx(css.inputField, {
//                 [css.inputFieldError]: errors.email,
//                 [css.inputFieldActivated]: isFieldActivated.email,
//               })}
//               {...register('email')}
//               onBlur={() => handleActivate('email')}
//             />
//             {errors.email && (
// <<<<<<< HEAD
//               <span className={css.errMessage}>{errors.email.message}</span>
// =======
//               <span className={css.errors}>{errors.email.message}</span>
// >>>>>>> origin/main
//             )}
//           </div>
//           <div className={css.signUpFormInput}>
//             <label htmlFor={passwordFieldId} className={css.fieldText}>
//               Password
//             </label>
//             <input
//               type={showPassword ? 'text' : 'password'}
//               id={passwordFieldId}
//               placeholder="Enter your password"
//               className={clsx(css.inputField, {
//                 [css.inputFieldError]: errors.password,
//                 [css.inputFieldActivated]: isFieldActivated.password,
//               })}
//               {...register('password')}
//               onBlur={() => handleActivate('password')}
//             />
//             <button
//               type="button"
//               className={css.togglePasswordBtn}
//               onClick={togglePasswordVisibility}
//             >
//               <svg className={css.eyeIcon} width="20" height="20">
//                 <use
//                   href={`/svg/sprite.svg#${showPassword ? 'eye' : 'eye-off'}`}
//                 ></use>
//               </svg>
//             </button>
//             {errors.password && (
// <<<<<<< HEAD
//               <span className={css.errMessage}>{errors.password.message}</span>
// =======
//               <span className={css.errors}>{errors.password.message}</span>
// >>>>>>> origin/main
//             )}
//           </div>
//           <div className={css.signUpFormInput}>
//             <label htmlFor={repeatPasswordFieldId} className={css.fieldText}>
//               Repeat password
//             </label>
//             <input
// <<<<<<< HEAD
//               type={showPassword ? 'text' : 'password'}
//               id={repeatPasswordFieldId}
// =======
//               className={`${css.input} ${
//                 errors.repeatPassword ? css.error : ''
//               }`}
//               type={showRepeatPassword ? 'text' : 'password'}
//               {...register('repeatPassword')}
// >>>>>>> origin/main
//               placeholder="Repeat password"
//               className={clsx(css.inputField, {
//                 [css.inputFieldError]: errors.repeatPassword,
//                 [css.inputFieldActivated]: isFieldActivated.repeatPassword,
//               })}
//               {...register('repeatPassword')}
//               onBlur={() => handleActivate('repeatPassword')}
//             />
//             <button
//               type="button"
//               className={css.togglePasswordBtn}
//               onClick={togglePasswordVisibility}
//             >
//               <svg className={css.eyeIcon} width="20" height="20">
//                 <use
//                   href={`/svg/sprite.svg#${
//                     showPassword ? 'icon-eye' : 'icon-eye-off'
//                   }`}
//                 ></use>
//               </svg>
//             </button>
//             {errors.repeatPassword && (
// <<<<<<< HEAD
//               <span className={css.errMessage}>
//                 {errors.repeatPassword.message}
//               </span>
//             )}
// =======
//               <span className={css.errors}>
//                 {errors.repeatPassword.message}
//               </span>
//             )}
//             <svg
//               className={showRepeatPassword ? css.eyeIconOff : css.icon_eye}
//               onClick={() => setRepeatPassword(!showRepeatPassword)}
//             >
//               <use
//                 width={20}
//                 height={20}
//                 xlinkHref={`${sprite}${
//                   showRepeatPassword ? '#eye' : '#eye-off'
//                 }`}
//               ></use>
//             </svg>
// >>>>>>> origin/main
//           </div>
//           <button type="submit" className={css.signUpBtn}>
//             Sign Up
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUpForm;
