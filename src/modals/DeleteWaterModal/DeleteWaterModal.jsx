import { useDispatch } from 'react-redux';
import { deleteWater } from '../../redux/water/operations';
import UniversalModal from '../Modal/Modal';
import css from './DeleteWaterModal.module.css';
import { toast } from 'react-toastify';

const DeleteWaterModal = ({ isOpen, closeModal, waterId }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteWater(waterId));
      toast.success('Запис видалено успішно');
      closeModal();
    } catch (error) {
      toast.error('Помилка при видаленні');
      console.error('Помилка при видаленні:', error);
    }
  };

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
            onClick={handleDelete}
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
