import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import css from './DeleteWaterModal.module.css';
import { deleteWater } from '../../redux/water/operations';
import { useModalContext } from '../../context/useModalContext';

const DeleteWaterModal = ({ id }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { closeModal } = useModalContext();
  const handleDelete = id => {
    dispatch(deleteWater({ id }));
    closeModal();
  };

  return (
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

        <button className={css.buttonCancel} type="button" onClick={closeModal}>
          {t('modals.cancel')}
        </button>
      </div>
    </div>
  );
};

export default DeleteWaterModal;
