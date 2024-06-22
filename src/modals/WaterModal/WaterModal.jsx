import WaterForm from '../../components/WaterForm/WaterForm';
import UniversalModal from '../Modal/Modal';

const WaterModal = ({ isOpen, closeModal }) => {
  return (
    <UniversalModal isOpen={isOpen} closeModal={closeModal}>
      <WaterForm />
    </UniversalModal>
  );
};

export default WaterModal;
