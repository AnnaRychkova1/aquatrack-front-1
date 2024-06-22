import UniversalModal from '../Modal/Modal';
import css from './LogOutModal.module.css';

const LogOutModal = ({ isOpen, closeModal }) => {
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

  return (
    <UniversalModal isOpen={isOpen} closeModal={closeModal}>
      <div className={css.LogOutModal}>
        <p className={css.title}>Log out</p>

        <p className={css.subtitle}>Do you really want to leave?</p>
        <div className={css.boxButton}>
          <button
            className={css.buttonLogOut}
            type="button"
            // onClick={handleLogOut}
          >
            Log out
          </button>

          <button
            className={css.buttonCancel}
            type="button"
            // onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </UniversalModal>
  );
};

export default LogOutModal;
