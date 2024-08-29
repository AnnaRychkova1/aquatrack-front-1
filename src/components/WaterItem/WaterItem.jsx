import { useTranslation } from 'react-i18next';
import css from './WaterItem.module.css';

import DeleteWaterModal from '../../modals/DeleteWaterModal/DeleteWaterModal';
import WaterModal from '../../modals/WaterModal/WaterModal';
import Iconsvg from '../../shared/components/Icon/Icon';
import { useModalContext } from '../../context/useModalContext';

const formatTime = dateString => {
  const date = new Date(dateString);
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  };
  return date.toLocaleTimeString(undefined, options);
};

const WaterItem = ({ id, volume, date }) => {
  const { t } = useTranslation();
  const { openModal } = useModalContext();
  const time = formatTime(date);

  return (
    <div className={css.waterCard}>
      <Iconsvg
        width="38"
        height="38"
        iconName="mage_water-glass-fill"
        className={css.waterglass}
      />

      <div className={css.waterInfo}>
        <p className={css.volume}>
          {volume > 999 ? volume / 1000 : volume}{' '}
          {volume > 999 ? t('trackerPage.liter') : t('trackerPage.ml')}
        </p>
        <p className={css.time}>{time}</p>
      </div>
      <div className={css.waterButtons}>
        <div className="reactour__waterEditCard">
          <button
            onClick={() => {
              openModal(
                <WaterModal
                  operationType="edit"
                  id={id}
                  volume={volume}
                  myTime={time}
                />
              );
            }}
            className={css.button}
            type="button"
            aria-label="Edit water value"
          >
            <Iconsvg
              width="14"
              height="14"
              iconName="edit"
              className={css.waterButtonSvg}
            />
          </button>
        </div>
        <div className="reactour__waterDeleteCard">
          <button
            onClick={() => {
              openModal(<DeleteWaterModal id={id} />);
            }}
            className={css.button}
            type="button"
            aria-label="Delete item"
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
    </div>
  );
};

export default WaterItem;
