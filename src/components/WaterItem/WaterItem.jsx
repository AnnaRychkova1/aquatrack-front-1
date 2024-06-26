import DeleteWaterModal from '../../modals/DeleteWaterModal/DeleteWaterModal';
import WaterModal from '../../modals/WaterModal/WaterModal';
import Iconsvg from '../Icon/Icon';
import css from './WaterItem.module.css';
import { useState } from 'react';

const WaterItem = ({ id, volume, time, isEditable }) => {
  const [isWaterModalOpen, setIsWaterModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openWaterModal = () => setIsWaterModalOpen(true);
  const closeWaterModal = () => setIsWaterModalOpen(false);

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);
  console.log(id);
  return (
    <>
      <div className={css.waterCard}>
        <Iconsvg
          width="38"
          height="38"
          iconName="mage_water-glass-fill"
          className={css.waterglass}
        />

        <div className={css.waterInfo}>
          <p className={css.volume}>{volume}</p>
          <p className={css.time}>{time}</p>
        </div>
        <div className={css.waterButtons}>
          <button
            onClick={openWaterModal}
            className={css.button}
            type="button"
            aria-label="Edit water value"
            disabled={!isEditable}
          >
            <Iconsvg
              width="14"
              height="14"
              iconName="edit"
              className={css.waterButtonSvg}
            />
          </button>
          <button
            onClick={openDeleteModal}
            className={css.button}
            type="button"
            aria-label="Delete item"
            disabled={!isEditable}
          >
            <Iconsvg
              width="14"
              height="14"
              iconName="trash"
              className={css.waterButtonSvg}
            />
          </button>
        </div>
      </div>
      <WaterModal isOpen={isWaterModalOpen} closeModal={closeWaterModal} operationType={'edit'}/>
      <DeleteWaterModal
        isOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
      />
    </>
  );
};

export default WaterItem;
