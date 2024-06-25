// import { ErrorMessage, Field, Form, Formik } from 'formik';
// import * as Yup from 'yup';
// import Iconsvg from '../Icon/Icon';
// //import css from "./UserSettingsForm.module.css";
// //import { useDispatch } from "react-redux";
// //import { apiRegisterUser } from "../redux/auth/operations";

// const UserSettingsSchema = Yup.object().shape({
//   name: Yup.string()
//     .min(2, 'User name must be at least 2 characters!')
//     .max(50, 'User name must be less than 50 characters!'),
//   email: Yup.string()
//     .required('Email is required!')
//     .email('Must be a valid email!'),
//   weight: Yup.number().min(0, 'Weight must be a positive number!'),
//   gender: Yup.string()
//     .required('Gender is required!')
//     .oneOf(['woman', 'man'], 'Invalid gender selection!'),
//   activeTimeSports: Yup.number().min(
//     0,
//     'Active time must be a positive number!'
//   ),
//   waterDrink: Yup.number()
//     .required('Water Drink is required!')
//     .min(0, 'Water Drink must be a positive number!'),
// });

// const INITIAL_FORM_DATA = {
//   name: '',
//   email: '',
//   weight: 0,
//   activeTimeSports: 0,
//   waterDrink: 1.8,
// };

// const UserSettingsForm = ({ closeModal }) => {
//   // const dispatch = useDispatch();
//   // const user = useSelector((state) => state.user);

//   const handleSubmit = values => {
//     // dispatch(
//     //   apiRegisterUser({
//     //     name: values.name,
//     //     email: values.email,
//     //     password: values.password,
//     //   })
//     // )
//     //   .unwrap()
//     //   .then(() => {
//     //     console.log("login success");
//     //   })
//     //   .catch(() => {
//     //     console.log("login error");
//     //   });

//     return false;
//   };

//   return (
//     <div>
//       <div>
//         <h3>Setting</h3>
//       </div>
//       <Formik
//         validationSchema={UserSettingsSchema}
//         initialValues={INITIAL_FORM_DATA}
//         onSubmit={handleSubmit}
//       ></Formik>
//     </div>
//   );
// };

//export default UserSettingsForm;
//import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import css from './UserSettingsForm.module.css';
import { useEffect, useState } from 'react';
import Iconsvg from '../Icon/Icon';
//import Avatar from 'react-avatar';
//import { useDispatch, useSelector } from 'react-redux';
//import { updateUserSettings } from '../redux/user/operations'; // Потрібно визначити цю операцію

const UserSettingsSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'User name must be at least 2 characters!')
    .max(50, 'User name must be less than 50 characters!'),
  email: Yup.string()
    .required('Email is required!')
    .email('Must be a valid email!'),
  weight: Yup.number().min(0, 'Weight must be a positive number!'),
  activeTime: Yup.number().min(0, 'Active time must be a positive number!'),
  waterIntake: Yup.number()
    .required('Water intake is required!')
    .min(0, 'Water intake must be a positive number!'),
  gender: Yup.string()
    .required('Gender is required!')
    .oneOf(['woman', 'man'], 'Invalid gender selection!'),
  avatar: Yup.mixed()
    .test(
      'fileSize',
      'File too large',
      value => !value || (value && value.size <= 1024 * 1024)
    )
    .test(
      'fileFormat',
      'Unsupported Format',
      value =>
        !value ||
        (value && ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type))
    ),
});

const UserSettingsForm = ({ isOpen, onClose }) => {
  // const dispatch = useDispatch();
  // const user = useSelector(state => state.user);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UserSettingsSchema),
    //defaultValues: { ...user },
    defaultValues: {
      name: '',
      email: '',
      weight: '',
      activeTime: '',
      waterIntake: '',
      gender: '',
      avatar: null,
    },
  });

  const handleAvatarChange = e => {
    const file = e.target.avatar;
    // console.log('Selected file:', file);
    setValue('avatar', file);
    if (file) {
      const preview = URL.createObjectURL(file);
      setAvatarPreview(preview);
      //   console.log('Generated preview URL:', preview);
    }
  };

  const onSubmit = values => {
    // const formData = new FormData();
    // Object.keys(values).forEach(key => {
    //   formData.append(key, values[key]);
    // });
    // dispatch(updateUserSettings(formData))
    //   .unwrap()
    //   .then(() => {
    //     console.log('Settings update success');
    //     onClose();
    //   })
    //   .catch(error => {
    //     console.error('Settings update error', error);
    //     alert('Error updating settings: ' + error.message); // Можна зробити більш складний notification
    //   });
  };
  // useEffect(() => {
  //   if (!avatarPreview) {
  //     console.log('Avatar Preview:', avatarPreview);
  //   }
  // }, [avatarPreview]);
  return (
    //<div className={css.wrapper}>
    //<div className={css.settingsModal}>
    <form className={css.settingForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.settingsAvatarContainer}>
        <img
          className={css.settingsAvatarImage}
          // name={user.name}
          src={avatarPreview}
          size="80"
        />
        <label className={css.settingsAvatarLabel}>
          <Iconsvg iconName="upload" className={css.iconUpload} />
          Upload a photo
          <input
            className={css.settingsAvatarInput}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleAvatarChange}
            {...register('avatar')}
          />
        </label>
        {errors.avatar && <span>{errors.avatar.message}</span>}
      </div>
      <div className={css.settingsFormContent}>
        <div className={css.settingsFormData}>
          {' '}
          <label className={css.settingsGenders}>
            <span className={css.settingsGenderTitle}>
              Your gender identity
            </span>
            <input
              className={css.settingsGender}
              type="radio"
              value="woman"
              {...register('gender')}
            />
            <span className={css.settingsGenderText}>Woman</span>
            <input
              className={css.settingsGender}
              type="radio"
              value="man"
              {...register('gender')}
            />
            <span className={css.settingsGenderText}>Man</span>
          </label>
          {errors.gender && <span>{errors.gender.message}</span>}
          <label className={css.settingsName}>
            <span className={css.settingsNameTitle}>Your name</span>
            <input
              className={css.settingsNameText}
              type="text"
              {...register('name')}
            />
            {errors.name && <span>{errors.name.message}</span>}
          </label>
          <label className={css.settingsEmail}>
            <span className={css.settingsEmailTitle}>Email</span>
            <input
              className={css.settingsEmailText}
              type="email"
              {...register('email')}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </label>
          <div className={css.settingsDailyNorma}>
            <p className={css.settingsDailyNormaTitle}>My daily norma</p>
            <p className={css.settingsDailyNormaText}>
              For woman: V=(M*0.03) + (T*0.4)
            </p>
            <p className={css.settingsDailyNormaText}>
              For man: V=(M*0.04) + (T*0.6)
            </p>
            <p className={css.settingsDailyNormaContent}>
              * V is the volume of the water norm in liters per day, M is your
              body weight, T is the time of active sports, or another type of
              activity commensurate in terms of loads (in the absence of these,
              you must set 0)
            </p>
            <p className={css.settingsDailyNormaText}>Active time in hours</p>
          </div>
        </div>
        <div className={css.settingsParams}>
          <label className={css.settingsWeight}>
            <span className={css.settingsWeightTitle}>
              Your weight in kilograms
            </span>
            <input
              className={css.settingsWeightText}
              type="number"
              {...register('weight')}
            />
            {errors.weight && <span>{errors.weight.message}</span>}
          </label>
          <label className={css.settingsTime}>
            <span className={css.settingsTimeTitle}>
              The time of active participation in sports
            </span>
            <input
              className={css.settingsTimeText}
              type="number"
              {...register('activeTime')}
            />
            {errors.activeTime && <span>{errors.activeTime.message}</span>}
          </label>
          <label className={css.settingsLiters}>
            <span className={css.settingsLitersTitle}>
              The required amount of water in liters per day The required amount
              of water in liters per day The required amount of water in liters
              per day The required amount of water in liters per day The
              required amount of water in liters per day The required amount of
              water in liters per day
            </span>
            <input
              className={css.settingsLitersText}
              type="number"
              {...register('waterIntake')}
            />
            {errors.waterIntake && <span>{errors.waterIntake.message}</span>}
          </label>
        </div>
      </div>
      <button className={css.settingsButton} type="submit">
        Save
      </button>
    </form>
    //</div>
    //</div>
  );
};

export default UserSettingsForm;
