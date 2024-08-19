import { RotatingLines } from 'react-loader-spinner';
import css from '../Loader/Loader.module.css';

const Loader = () => {
  return (
    <div className={css.loader}>
      <RotatingLines
        visible={true}
        height="60"
        width="60"
        color="#9BE1A0"
        strokeWidth="3"
        animationDuration="0.9"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
