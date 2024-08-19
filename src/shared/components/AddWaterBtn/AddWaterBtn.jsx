import { useTranslation } from 'react-i18next';
import WaterModal from '../../../modals/WaterModal/WaterModal';
import Iconsvg from '../../components/Icon/Icon';
import { useModalContext } from '../../../context/useModalContext';

const AddWaterBtn = ({ buttonStyle, iconStyle, textStyle }) => {
  const { t } = useTranslation();
  const { openModal } = useModalContext();
  return (
    <button
      onClick={() => {
        openModal(<WaterModal operationType="add" />);
      }}
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
      <span className={textStyle}>{t('trackerPage.addWater')}</span>
    </button>
  );
};

export default AddWaterBtn;
