import { useState } from 'react';
import WaterModal from '../../modals/WaterModal/WaterModal';
import Iconsvg from '../Icon/Icon';
import css from './AddWaterBtn.module.css';

const AddWaterBtn = () => {
  const [isAddWaterModalOpen, setIsAddWaterModalOpen] = useState(false);

  const openAddWaterModal = () => setIsAddWaterModalOpen(true);
  const closeAddWaterModal = () => setIsAddWaterModalOpen(false);
  return (
    <div>
      <button
        onClick={openAddWaterModal}
        className={css.cardButton}
        type="button"
        aria-label="Add water"
      >
        <Iconsvg
          width="30"
          height="30"
          iconName="plus_dark"
          styles={css.cardIcon}
        />
        <span className={css.cardButtonTitle}>Add water</span>
      </button>
      <WaterModal
        isOpen={isAddWaterModalOpen}
        closeModal={closeAddWaterModal}
      />
    </div>
  );
};

export default AddWaterBtn;
