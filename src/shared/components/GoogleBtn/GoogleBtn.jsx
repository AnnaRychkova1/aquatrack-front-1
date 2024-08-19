import { FcGoogle } from 'react-icons/fc';
import { useTranslation } from 'react-i18next';
import style from './GoogleBtn.module.css';

// const BASE_URL = 'http://localhost:3000';

const BASE_URL = 'https://aquatrack-back-1.onrender.com';

const GoogleBtn = ({ type }) => {
  const { t } = useTranslation();

  return (
    <a
      className={style.googleBtn}
      href={`${BASE_URL}/api/users/google`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FcGoogle className={style.googleIcon} />{' '}
      <span>
        {type === 'In' ? t('signinForm.google') : t('signupForm.google')}
      </span>
    </a>
  );
};

export default GoogleBtn;
