// import { useDispatch } from 'react-redux';
// import { deleteWater, updateWaters } from '../../redux/water/operations';

import UniversalModal from '../Modal/Modal';
import css from './DeleteWaterModal.module.css';

const DeleteWaterModal = ({ isOpen, closeModal }) => {
  // const dispatch = useDispatch();

  // const handleDelete = async () => {
  //   try {
  //     // await dispatch(deleteWater());
  //     // dispatch(updateWaters());
  //     onClose();
  //   } catch (error) {
  //     alert(error);
  //   }
  // };

  return (
    <UniversalModal isOpen={isOpen} closeModal={closeModal}>
      <div className={css.deleteWaterModal}>
        <p className={css.title}>Delete entry</p>

        <p className={css.subtitle}>
          Are you sure you want to delete the entry?
        </p>
        <div className={css.boxButton}>
          <button
            className={css.buttonDelete}
            type="button"
            // onClick={handleDelete}
          >
            Delete
          </button>

          <button className={css.buttonCancel} type="button">
            Cancel
          </button>
        </div>
      </div>
    </UniversalModal>
  );
};

export default DeleteWaterModal;
