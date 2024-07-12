import { useDispatch } from 'react-redux';

import { deleteWater } from '../../redux/water/operations';
import UniversalModal from '../Modal/Modal';
import css from './DeleteWaterModal.module.css';
import { useTranslation } from 'react-i18next';

const DeleteWaterModal = ({ isOpen, closeModal, id }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleDelete = id => {
    dispatch(deleteWater({ id }));
  };

  return (
    <UniversalModal isOpen={isOpen} closeModal={closeModal} id={id}>
      <div className={css.deleteWaterModal}>
        <p className={css.title}>{t('modals.deleteEntry')}</p>

        <p className={css.subtitle}>{t('modals.sureDelete')}?</p>
        <div className={css.boxButton}>
          <button
            className={css.buttonDelete}
            type="button"
            onClick={() => handleDelete(id)}
          >
            {t('modals.delete')}
          </button>

          <button
            className={css.buttonCancel}
            type="button"
            onClick={() => closeModal()}
          >
            {t('modals.cancel')}
          </button>
        </div>
      </div>
    </UniversalModal>
  );
};

export default DeleteWaterModal;
