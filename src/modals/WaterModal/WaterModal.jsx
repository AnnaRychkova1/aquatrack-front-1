import { useTranslation } from 'react-i18next';
import css from './WaterModal.module.css';
import WaterForm from '../../forms/WaterForm/WaterForm';

const WaterModal = ({ operationType, id, volume, myTime }) => {
  const { t } = useTranslation();
  return (
    <div className={css.wrapper}>
      <h3 className={css.title}>
        {operationType === 'edit'
          ? t('modals.editHeader')
          : t('modals.addHeader')}
      </h3>
      <p className={css.subtitle}>
        {operationType === 'edit' ? t('modals.editText') : t('modals.addText')}
      </p>
      <WaterForm
        id={id}
        volume={volume}
        operationType={operationType}
        myTime={myTime}
      />
    </div>
  );
};

export default WaterModal;
