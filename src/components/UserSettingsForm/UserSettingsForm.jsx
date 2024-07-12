import { useForm } from 'react-hook-form';
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
  selectUser,
  selectWaterDrink,
} from '../../redux/users/selectors';
import {
  updateUserProfile,
  uploadUserAvatar,
} from '../../redux/users/operations';
import { useTranslation } from 'react-i18next';

const UserSettingsSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Enter at least 3 characters')
    .max(10, 'Enter a maximum of 10 characters')
    .matches(/^[A-Za-z]+$/, 'Enter only letters'),
  email: Yup.string()
    .email('Please enter valid email')
    .required('Email field is required'),
  weight: Yup.number()
    .transform(value => (isNaN(value) ? 0 : value))
    .nullable()
    .min(0, 'Weight must be a positive number!'),
  activeTimeSports: Yup.number()
    .transform(value => (isNaN(value) ? 0 : value))
    .nullable()
    .min(0, 'Active time must be a positive number!'),
  waterDrink: Yup.number()
    .required('Water intake is required!')
    .typeError('The rate of water drink should be a number!')
    .min(0, 'Water intake must be a positive number!'),
  gender: Yup.string().oneOf(['woman', 'man'], 'Invalid gender selection!'),
  avatarURL: Yup.mixed(),
});

const API_URL = 'https://aquatrack-back-1.onrender.com/api/';

const UserSettingsForm = ({ closeModal, closePopover }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userDataAvatar = useSelector(selectAvatar);
  const userDataWaterDrink = useSelector(selectWaterDrink);
  const userDataName = useSelector(selectName);
  const userDataWeight = useSelector(state => selectUser(state).weight);
  const userDataTimeSports = useSelector(
    state => selectUser(state).activeTimeSports
  );
  const userDataGender = useSelector(state => selectUser(state).gender);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [savedAvatarURL, setSavedAvatarURL] = useState(userDataAvatar);
  const [avatarFile, setAvatarFile] = useState(null);
  const userDataEmail = useSelector(selectEmail);
  const [calculatedWater, setCalculatedWater] = useState(userDataWaterDrink);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    trigger,
    clearErrors,
  } = useForm({
    resolver: yupResolver(UserSettingsSchema),
    defaultValues: {
      name: userDataName,
      email: userDataEmail,
      weight: userDataWeight,
      activeTimeSports: userDataTimeSports,
      waterDrink: userDataWaterDrink,
      gender: userDataGender,
      avatarURL: userDataAvatar,
    },
  });

  const weight = watch('weight');
  const activeTime = watch('activeTimeSports');
  const gender = watch('gender');

  useEffect(() => {
    if (weight && activeTime && gender) {
      let waterDrink = 0;
      if (gender === 'woman') {
        waterDrink = Math.max(weight * 0.03 + activeTime * 0.4, 0);
      } else if (gender === 'man') {
        waterDrink = Math.max(weight * 0.04 + activeTime * 0.6, 0);
      }
      setValue('waterDrink', waterDrink.toFixed(1));
      setCalculatedWater(waterDrink.toFixed(1));
    }
  }, [weight, activeTime, gender, setValue]);

  const handleAvatarChange = e => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setAvatarPreview(preview);
      setValue('avatarURL', file);
      setAvatarFile(file);
      const formData = new FormData();
      formData.append('avatar', file);
      setSavedAvatarURL(formData);
    }
  };

  const handleBlur = () => {
    trigger('name');
  };
  const handleFocus = () => {
    clearErrors('name');
  };

  const handleBlurEmail = () => {
    trigger('email');
  };
  const handleFocusEmail = () => {
    clearErrors('email');
  };

  const handleBlurWeight = () => {
    trigger('weight');
  };
  const handleFocusWeight = () => {
    clearErrors('weight');
  };

  const handleBlurSports = () => {
    trigger('activeTimeSports');
  };
  const handleFocusSports = () => {
    clearErrors('activeTimeSports');
  };

  const handleBlurDrink = () => {
    trigger('waterDrink');
  };
  const handleFocusDrink = () => {
    clearErrors('waterDrink');
  };

  const onSubmit1 = async values => {
    const updatedData = {
      name: values.name,
      email: values.email,
      weight: values.weight,
      activeTimeSports: values.activeTimeSports,
      waterDrink: values.waterDrink,
      gender: values.gender,
    };

    await dispatch(updateUserProfile(updatedData));

    if (avatarFile) {
      await dispatch(uploadUserAvatar(savedAvatarURL));
    }
    closeModal();
    closePopover();
  };

  return (
    <form className={css.settingForm} onSubmit={handleSubmit(onSubmit1)}>
      <div className={css.settingsAvatarContainer}>
        <img
          className={css.settingsAvatarImage}
          src={
            avatarPreview ||
            `${savedAvatarURL}` ||
            `${API_URL}${savedAvatarURL}`
          }
          size="80"
        />
        <label
          onChange={handleAvatarChange}
          className={css.settingsAvatarLabel}
        >
          <Iconsvg iconName="upload" className={css.iconUpload} />
          {t('modals.uploadPhoto')}
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
            <p className={css.settingsGenderTitle}>{t('modals.gender')}</p>
            <div className={css.settingsGenderInputs}>
              <label className={css.settingsGender}>
                <input
                  className={css.settingsGenderInput}
                  type="radio"
                  value="woman"
                  {...register('gender')}
                />
                <span className={css.settingsGenderText}>
                  {t('modals.woman')}
                </span>
              </label>
              <label className={css.settingsGender}>
                <input
                  className={`${css.settingsGenderInput}${
                    errors.gender ? css.error : ''
                  }`}
                  type="radio"
                  value="man"
                  {...register('gender')}
                />
                <span className={css.settingsGenderText}>
                  {t('modals.man')}
                </span>
              </label>
            </div>
            {errors.gender && (
              <span className={css.errorsgender}>{errors.gender.message}</span>
            )}
          </div>
          <div className={css.settingsUser}>
            <label className={css.settingsUserLabel}>
              <span className={css.settingsUserTitle}>{t('modals.name')}</span>
              <input
                className={`${css.inputForm} ${errors.name ? css.error : ''}`}
                type="text"
                {...register('name')}
                onBlur={handleBlur}
                onFocus={handleFocus}
              />
              {errors.name && (
                <span className={css.errors}>{errors.name.message}</span>
              )}
            </label>
            <label className={css.settingsUserLabel}>
              <span className={css.settingsUserTitle}>{t('modals.email')}</span>
              <input
                className={`${css.inputForm} ${errors.email ? css.error : ''}`}
                type="email"
                {...register('email')}
                onBlur={handleBlurEmail}
                onFocus={handleFocusEmail}
              />
              {errors.email && (
                <span className={css.errors}>{errors.email.message}</span>
              )}
            </label>
          </div>
          <div className={css.settingsDailyNorma}>
            <p className={css.settingsDailyNormaTitle}>
              {t('modals.myDailyNorma')}
            </p>
            <div className={css.settingsDailyNormaEquations}>
              <p className={css.settingsDailyNormaEquation}>
                {t('modals.forWoman')}: <span>V=(M*0.03) + (T*0.4)</span>
              </p>
              <p className={css.settingsDailyNormaEquation}>
                {t('modals.forMan')}: <span>V=(M*0.04) + (T*0.6)</span>
              </p>
            </div>
            <p className={css.settingsDailyNormaContent}>
              <span>*</span>
              {t('modals.countVolume')}
            </p>
            <p className={css.settingsDailyNormaText}>
              <Iconsvg width="14" height="14" iconName={'exclamation'} />
              {t('modals.activeTime')}
            </p>
          </div>
        </div>
        <div className={css.settingsParams}>
          <div className={css.settingsUserParams}>
            <label className={css.settingsParam}>
              <span className={css.settingsParamTitle}>
                {t('modals.yourWeight')}:
              </span>
              <input
                className={`${css.inputForm} ${errors.weight ? css.error : ''}`}
                type="number"
                {...register('weight')}
                onBlur={handleBlurWeight}
                onFocus={handleFocusWeight}
              />
              {errors.weight && (
                <span className={css.errors}>{errors.weight.message}</span>
              )}
            </label>
            <label className={css.settingsParam}>
              <span className={css.settingsParamTitle}>
                {t('modals.yourActivities')}:
              </span>
              <input
                className={`${css.inputForm} ${
                  errors.activeTimeSports ? css.error : ''
                }`}
                type="number"
                {...register('activeTimeSports')}
                onBlur={handleBlurSports}
                onFocus={handleFocusSports}
              />
              {errors.activeTimeSports && (
                <span className={css.errors}>
                  {errors.activeTimeSports.message}
                </span>
              )}
            </label>
          </div>
          <div className={css.settingsLitersParams}>
            <p className={css.settingsLitersRequired}>
              {t('modals.require')}:
              <span>
                {calculatedWater} {t('trackerPage.liter')}
              </span>
            </p>
            <label className={css.settingsLiters}>
              <span className={css.settingsLitersTitle}>
                {t('modals.writeDown')}:
              </span>
              <input
                className={`${css.inputForm} ${
                  errors.waterDrink ? css.error : ''
                }`}
                type="number"
                step="any"
                {...register('waterDrink')}
                onChange={e => setCalculatedWater(e.target.value)}
                value={calculatedWater}
                onBlur={handleBlurDrink}
                onFocus={handleFocusDrink}
              />
              {errors.waterDrink && (
                <span className={css.errors}>{errors.waterDrink.message}</span>
              )}
            </label>
          </div>
        </div>
      </div>
      <button className={css.settingsButton} type="submit">
        {t('modals.save')}
      </button>
    </form>
  );
};

export default UserSettingsForm;
