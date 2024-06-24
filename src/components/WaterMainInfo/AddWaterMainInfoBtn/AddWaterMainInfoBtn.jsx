import Iconsvg from '../../Icon/Icon';
import css from './AddWaterMainInfoBtn.module.css';
import { useState } from 'react';
import WaterModal from '../../../modals/WaterModal/WaterModal';

const AddWaterMainInfoBtn = () => {
  const [isAddWaterModalOpen, setIsAddWaterModalOpen] = useState(false);

  const openAddWaterModal = () => setIsAddWaterModalOpen(true);
  const closeAddWaterModal = () => setIsAddWaterModalOpen(false);

  return (
    <div className={css.contBtn}>
      <button className={css.btn} type="button" onClick={openAddWaterModal}>
        <Iconsvg
          width="16"
          height="16"
          iconName="plus_dark"
          className={css.icon}
        />

        <span className={css.textBtn}>Add Water</span>
      </button>
      <WaterModal
        isOpen={isAddWaterModalOpen}
        closeModal={closeAddWaterModal}
      />
    </div>
  );
};

export default AddWaterMainInfoBtn;
