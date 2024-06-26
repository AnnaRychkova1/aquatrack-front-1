import { useState } from 'react';
import WaterModal from '../../modals/WaterModal/WaterModal';
import Iconsvg from '../Icon/Icon';
// import css from './AddWaterBtn.module.css';

const AddWaterBtn = ({ buttonStyle, iconStyle, textStyle }) => {
  const [isAddWaterModalOpen, setIsAddWaterModalOpen] = useState(false);

  const openAddWaterModal = () => setIsAddWaterModalOpen(true);
  const closeAddWaterModal = () => setIsAddWaterModalOpen(false);
  const operationType = 'add';
  return (
    <>
      <button
        onClick={openAddWaterModal}
        className={buttonStyle}
        type="button"
        aria-label="Add water"
      >
        <Iconsvg
          width="30"
          height="30"
          iconName="plus_dark"
          className={iconStyle}
        />
        <span className={textStyle}>Add water</span>
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
