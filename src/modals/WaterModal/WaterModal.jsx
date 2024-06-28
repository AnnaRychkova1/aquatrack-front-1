import UniversalModal from '../Modal/Modal';
import WaterForm from '../WaterForm/WaterForm';
import css from './WaterModal.module.css';

const WaterModal = ({
  isOpen,
  closeModal,
  operationType,
  id,
  date,
  volume,
}) => {
  return (
    <UniversalModal isOpen={isOpen} closeModal={closeModal}>
      <div className={css.wrapper}>
        <h3 className={css.title}>
          {operationType === 'edit'
            ? 'Edit the entered amount of water'
            : 'Add water'}
        </h3>
        <p className={css.subtitle}>
          {operationType === 'edit'
            ? 'Correct entered data:'
            : 'Choose a value'}
        </p>
        <WaterForm
          id={id}
          date={date}
          volume={volume}
          operationType={operationType}
          closeModal={closeModal}
        />
      </div>
    </UniversalModal>
  );
};

export default WaterModal;
