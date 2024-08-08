import UniversalModal from '../Modal/Modal';
import WaterForm from '../../forms/WaterForm/WaterForm';
import css from './WaterModal.module.css';
import { useTranslation } from 'react-i18next';

const WaterModal = ({
  isOpen,
  closeModal,
  operationType,
  id,
  volume,
  myTime,
}) => {
  const { t } = useTranslation();
  return (
    <UniversalModal isOpen={isOpen} closeModal={closeModal}>
      <div className={css.wrapper}>
        <h3 className={css.title}>
          {operationType === 'edit'
            ? t('modals.editHeader')
            : t('modals.addHeader')}
        </h3>
        <p className={css.subtitle}>
          {operationType === 'edit'
            ? t('modals.editText')
            : t('modals.addText')}
        </p>
        <WaterForm
          id={id}
          volume={volume}
          operationType={operationType}
          closeModal={closeModal}
          myTime={myTime}
        />
      </div>
    </UniversalModal>
  );
};

export default WaterModal;
