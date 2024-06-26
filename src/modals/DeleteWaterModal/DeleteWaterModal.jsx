import { useDispatch } from 'react-redux';

import { deleteWater } from '../../redux/water/operations';
import UniversalModal from '../Modal/Modal';
import css from './DeleteWaterModal.module.css';

const DeleteWaterModal = ({ isOpen, closeModal, id }) => {
  const dispatch = useDispatch();
  const handleDelete = id => {
    dispatch(deleteWater({ id }));
  };

  return (
    <UniversalModal isOpen={isOpen} closeModal={closeModal} id={id}>
      <div className={css.deleteWaterModal}>
        <p className={css.title}>Delete entry</p>

        <p className={css.subtitle}>
          Are you sure you want to delete the entry?
        </p>
        <div className={css.boxButton}>
          <button
            className={css.buttonDelete}
            type="button"
            onClick={() => handleDelete(id)}
          >
            Delete
          </button>

          <button
            className={css.buttonCancel}
            type="button"
            onClick={() => closeModal()}
          >
            Cancel
          </button>
        </div>
      </div>
    </UniversalModal>
  );
};

export default DeleteWaterModal;
