import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import WaterModal from '../../../modals/WaterModal/WaterModal';
import Iconsvg from '../../components/Icon/Icon';

const AddWaterBtn = ({ buttonStyle, iconStyle, textStyle }) => {
  const { t } = useTranslation();
  const [isAddWaterModalOpen, setIsAddWaterModalOpen] = useState(false);

  const openAddWaterModal = () => setIsAddWaterModalOpen(true);
  const closeAddWaterModal = () => setIsAddWaterModalOpen(false);

  const operationType = 'add';
  const isEditable = true;
  return (
    <>
      <button
        onClick={openAddWaterModal}
        className={buttonStyle}
        type="button"
        aria-label="Add water"
        disabled={!isEditable}
      >
        <Iconsvg
          width="30"
          height="30"
          iconName="plus_dark"
          className={iconStyle}
        />
        <span className={textStyle}>{t('trackerPage.addWater')}</span>
      </button>
      <WaterModal
        isOpen={isAddWaterModalOpen}
        closeModal={closeAddWaterModal}
        operationType={operationType}
      />
    </>
  );
};

export default AddWaterBtn;
