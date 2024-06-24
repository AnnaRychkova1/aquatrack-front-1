import { useState } from 'react';
import WaterForm from '../../components/WaterForm/WaterForm';
import UniversalModal from '../Modal/Modal';
import styles from './WaterModal.module.css';

const WaterModal = ({
  isOpen,
  closeModal,
  initialAmount,
  initialTime,
  onSave,
}) => {
  const [amount, setAmount] = useState(initialAmount || 50);
  const [time, setTime] = useState(initialTime || '7:00');
  const [value, setValue] = useState(initialAmount || 50);

  const handleAmountChange = delta => {
    const newAmount = amount + delta;
    if (newAmount >= 0) {
      setAmount(newAmount);
      setValue(newAmount);
    }
  };

  const handleSave = () => {
    onSave({ amount, time, value });
    closeModal();
  };
  return (
    <UniversalModal isOpen={isOpen} closeModal={closeModal}>
      <div className={styles.modalWrap}>
        <h2>
          {initialAmount ? 'Edit the entered amount of water' : 'Add water'}
        </h2>

        <WaterForm />
        <div className={styles.field}>
          <label>Amount of water:</label>
          <div className={styles.amountControl}>
            <button onClick={() => handleAmountChange(-50)}>-</button>
            <span>{amount} ml</span>
            <button onClick={() => handleAmountChange(50)}>+</button>
          </div>
        </div>
        <div className={styles.field}>
          <label>Recording time:</label>
          <input
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label>Enter the value of the water used:</label>
          <input
            type="number"
            value={value}
            onChange={e => setValue(parseInt(e.target.value))}
          />
        </div>
        <button className={styles.saveButton} onClick={handleSave}>
          Save
        </button>
      </div>
    </UniversalModal>
  );
};

export default WaterModal;
