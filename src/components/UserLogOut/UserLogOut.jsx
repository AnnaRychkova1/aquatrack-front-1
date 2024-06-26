import { useDispatch, useSelector } from 'react-redux';
import { selectWaterId } from '../../redux/users/selectors';
import { logOut } from '../../redux/users/operations';
//import Iconsvg from '../Icon/Icon';
import css from './LogOutModal.module.css';

const UserLogOut = ({ closeModal }) => {
  // const handleLogOut = async () => {
  //   try {
  //     const response = await fetch('/api/logout', {
  //       method: 'POST', // видалення сесії користувача
  //     });

  //     if (response.ok) {
  //       //  деавторизувати користувача на клієнті
  //       //  очистити redux store та localStorage
  //       //  переадресувати користувача на публічну сторінку "HomePage"
  //       onLogOut();
  //     } else {
  //       console.error('Server response error');
  //     }
  //   } catch (error) {
  //     console.error('An error occurred when sending the request', error);
  //   }
  // };
  const id = useSelector(selectWaterId);
  console.log(id);
  const dispatch = useDispatch();
  const onLogOut = () => {
    dispatch(logOut(id));
    closeModal();
  };
  return (
    <div className={css.LogOutModal}>
      <p className={css.title}>Log out</p>

      <p className={css.subtitle}>Do you really want to leave?</p>
      <div className={css.boxButton}>
        <button className={css.buttonLogOut} type="button" onClick={onLogOut}>
          Log out
        </button>

        <button className={css.buttonCancel} type="button" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UserLogOut;
