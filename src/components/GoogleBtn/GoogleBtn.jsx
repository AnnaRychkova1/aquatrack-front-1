import { FcGoogle } from 'react-icons/fc';
import style from './GoogleBtn.module.css';

//const BASE_URL = 'http://localhost:5173';

const BASE_URL = 'https://aquatrack-back-1.onrender.com';

const GoogleBtn = ({ type, className }) => {
  return (
    <a
      className={`${style.googleBtn} ${className}`}
      //href={`${BASE_URL}/api/users/google`}

      href="https://aquatrack-back-1.onrender.com/api/users/google"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FcGoogle className={style.googleIcon} /> Sign {type} with Google
    </a>
  );
};

export default GoogleBtn;
