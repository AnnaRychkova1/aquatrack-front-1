import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import css from './UserSettingsForm.module.css';
import { useEffect, useState } from 'react';
import Iconsvg from '../Icon/Icon';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAvatar,
  selectEmail,
  selectName,
  selectWaterDrink,
} from '../../redux/users/selectors';
import {
  updateUserProfile,
  uploadUserAvatar,
} from '../../redux/users/operations';
//const API_URL = 'https://aquatrack-back-1.onrender.com/api/';
const UserSettingsSchema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string()
    .required('Email is required!')
    .email('Must be a valid email!'),
  weight: Yup.number()
    .transform(value => (isNaN(value) ? null : value))
    .nullable()
    .min(0, 'Weight must be a positive number!'),
  activeTimeSports: Yup.number()
    .transform(value => (isNaN(value) ? null : value))
    .nullable()
    .min(0, 'Active time must be a positive number!'),
  waterDrink: Yup.number()
    .required('Water intake is required!')
    .min(0, 'Water intake must be a positive number!'),
  gender: Yup.string()
    .required('Gender is required!')
    .oneOf(['woman', 'man'], 'Invalid gender selection!'),
  avatarURL: Yup.mixed(),
  //   .test(
  //     'fileSize',
  //     'File too large',
  //     value => !value || (value && value.size <= 1024 * 1024)
  //   )
  //   .test(
  //     'fileFormat',
  //     'Unsupported Format',
  //     value =>
  //       !value ||
  //       (value && ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type))
  //   ),
});
const UserSettingsForm = ({ closeModal }) => {
  const dispatch = useDispatch();
  const userDataAvatar = useSelector(selectAvatar);
  const userDataWaterDrink = useSelector(selectWaterDrink);
  const userDataName = useSelector(selectName);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [savedAvatarURL, setSavedAvatarURL] = useState(userDataAvatar);
  const [avatarFile, setAvatarFile] = useState(null);
  const userDataEmail = useSelector(selectEmail);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UserSettingsSchema),
    //defaultValues: { ...user },
    defaultValues: {
      name: userDataName,
      email: userDataEmail,
      weight: '',
      activeTimeSports: '',
      waterDrink: '',
      gender: '',
      avatarURL: userDataAvatar,
    },
  });
  const weight = watch('weight');
  const activeTime = watch('activeTimeSports');
  const gender = watch('gender');

  useEffect(() => {
    if (weight && activeTime && gender) {
      let waterDrink;
      if (gender === 'woman') {
        waterDrink = weight * 0.03 + activeTime * 0.4;
      } else if (gender === 'man') {
        waterDrink = weight * 0.04 + activeTime * 0.6;
      }
      setValue('waterDrink', waterDrink.toFixed(1));
    }
  }, [weight, activeTime, gender, setValue]);
  const handleAvatarChange = e => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      const preview = URL.createObjectURL(file);
      setAvatarPreview(preview);
      setValue('avatarURL', file);
      setAvatarFile(file);
      const formData = new FormData();
      formData.append('avatar', file);
      dispatch(uploadUserAvatar(formData));
      // console.log(preview);
      // console.log('FormData before dispatch:', formData.get('avatar'));
    }
    console.log('ssdfbfbdfbfd');
  };
  console.log('ssdfbfbdfbfd');
  const onSubmit1 = async values => {
    console.log('Submitting form with values:', values);
    // const formData = new FormData();
    // Object.keys(values).forEach(key => {
    //   formData.append(key, values[key]);
    // });
    // dispatch(updateUserSettings(formData))
    //   .unwrap()s
    //   .then(() => {
    //     console.log('Settings update success');
    //     onClose();
    //   })
    //   .catch(error => {
    //     console.error('Settings update error', error);
    //     alert('Error updating settings: ' + error.message); // Можна зробити більш складний notification
    //   });
    // const updatedData = {};
    // if (values.name) updatedData.name = values.name;
    // if (values.email) updatedData.email = values.email;
    // if (values.weight) updatedData.weight = values.weight;
    // if (values.activeTimeSports)
    //   updatedData.activeTimeSports = values.activeTimeSports;
    // if (values.waterDrink) updatedData.waterDrink = values.waterDrink;
    // if (values.gender) updatedData.gender = values.gender;
    // setValue('name', updatedData.name);
    // setValue('email', updatedData.email);
    // setValue('weight', updatedData.weight);
    // setValue('activeTimeSports', updatedData.activeTimeSports);
    // setValue('waterDrink', updatedData.waterDrink);
    // setValue('gender', updatedData.gender);
    // if (avatarFile) {
    //   const formData = new FormData();
    //   formData.append('avatar', avatarFile);
    //   dispatch(uploadUserAvatar(formData));
    // }
    //dispatch(updateUserProfile(updatedData));
    const updatedData = {
      name: values.name,
      email: values.email,
      weight: values.weight,
      activeTimeSports: values.activeTimeSports,
      waterDrink: values.waterDrink,
      gender: values.gender,
    };

    // Dispatch update action and handle success
    try {
      await dispatch(updateUserProfile(updatedData));
      console.log('Profile update success');
      // Optionally update local component state or handle UI updates here
      closeModal(); // Close modal after successful update
    } catch (error) {
      console.error('Error updating profile', error);
      // Handle error if needed
    }
    console.log('Profile update success');
    closeModal();
  };
  console.log('ssdfbfbdfbfd');
  // useEffect(() => {
  //   if (!avatarPreview) {
  //     console.log('Avatar Preview:', avatarPreview);
  //   }
  // }, [avatarPreview]);
  // const omg = () => {
  //   console.log('OMG');
  // };
  return (
    //<div className={css.wrapper}>
    //<div className={css.settingsModal}>
    <form className={css.settingForm} onSubmit={handleSubmit(onSubmit1)}>
      <div className={css.settingsAvatarContainer}>
        <img
          className={css.settingsAvatarImage}
          // name={user.name}
          src={avatarPreview || `http://localhost:3000/${savedAvatarURL}`}
          size="80"
        />
        <label
          onChange={handleAvatarChange}
          className={css.settingsAvatarLabel}
        >
          <Iconsvg iconName="upload" className={css.iconUpload} />
          Upload a photo
          <input
            className={css.settingsAvatarInput}
            type="file"
            {...register('avatarURL')}
            style={{ display: 'none' }}
          />
        </label>
        {errors.avatar && <span>{errors.avatar.message}</span>}
      </div>
      <div className={css.settingsFormContent}>
        <div className={css.settingsFormData}>
          <div className={css.settingsGenders}>
            <p className={css.settingsGenderTitle}>Your gender identity</p>
            <div className={css.settingsGenderInputs}>
              <label className={css.settingsGender}>
                <input
                  className={css.settingsGenderInput}
                  type="radio"
                  value="woman"
                  {...register('gender')}
                />
                <span className={css.settingsGenderText}>Woman</span>
              </label>
              <label className={css.settingsGender}>
                <input
                  className={css.settingsGenderInput}
                  type="radio"
                  value="man"
                  {...register('gender')}
                />
                <span className={css.settingsGenderText}>Man</span>
              </label>
            </div>
            {errors.gender && <span>{errors.gender.message}</span>}
          </div>
          <div className={css.settingsUser}>
            <label className={css.settingsUserLabel}>
              <span className={css.settingsUserTitle}>Your name</span>
              <input
                className={css.settingsUserText}
                type="text"
                {...register('name')}
              />
              {errors.name && <span>{errors.name.message}</span>}
            </label>
            <label className={css.settingsUserLabel}>
              <span className={css.settingsUserTitle}>Email</span>
              <input
                className={css.settingsUserText}
                type="email"
                {...register('email')}
              />
              {errors.email && <span>{errors.email.message}</span>}
            </label>
          </div>

          <div className={css.settingsDailyNorma}>
            <p className={css.settingsDailyNormaTitle}>My daily norma</p>
            <div className={css.settingsDailyNormaEquations}>
              <p className={css.settingsDailyNormaEquation}>
                For woman: <span>V=(M*0.03) + (T*0.4)</span>
              </p>
              <p className={css.settingsDailyNormaEquation}>
                For man: <span>V=(M*0.04) + (T*0.6)</span>
              </p>
            </div>
            <p className={css.settingsDailyNormaContent}>
              <span>*</span> V is the volume of the water norm in liters per
              day, M is your body weight, T is the time of active sports, or
              another type of activity commensurate in terms of loads (in the
              absence of these, you must set 0)
            </p>
            <p className={css.settingsDailyNormaText}>
              <Iconsvg width="14" height="14" iconName={'exclamation'} />
              Active time in hours
            </p>
          </div>
        </div>
        <div className={css.settingsParams}>
          <div className={css.settingsUserParams}>
            <label className={css.settingsParam}>
              <span className={css.settingsParamTitle}>
                Your weight in kilograms:
              </span>
              <input
                className={css.settingsParamText}
                type="number"
                {...register('weight')}
              />
              {errors.weight && <span>{errors.weight.message}</span>}
            </label>
            <label className={css.settingsParam}>
              <span className={css.settingsParamTitle}>
                The time of active participation in sports:
              </span>
              <input
                className={css.settingsParamText}
                type="number"
                {...register('activeTimeSports')}
              />
              {errors.activeTimeSports && (
                <span>{errors.activeTimeSports.message}</span>
              )}
            </label>
          </div>
          <div className={css.settingsLitersParams}>
            <p className={css.settingsLitersRequired}>
              The required amount of water in liters per day:
              <span>{userDataWaterDrink} L</span>
            </p>
            <label className={css.settingsLiters}>
              <span className={css.settingsLitersTitle}>
                Write down how much water you will drink:
              </span>
              <input
                defaultValue={userDataWaterDrink}
                className={css.settingsLitersText}
                type="number"
                //onChange={e => setNumberValue(e.target.value)}
                {...register('waterDrink')}
              />
              {errors.waterDrink && <span>{errors.waterDrink.message}</span>}
            </label>
          </div>
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
