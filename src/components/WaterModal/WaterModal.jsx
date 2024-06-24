
import { useState } from 'react';
import styles from './WaterModal.module.css';

const WaterModal = ({ initialAmount, initialTime, onSave, onClose }) => {
  const [amount, setAmount] = useState(initialAmount || 50);
  const [time, setTime] = useState(initialTime || '7:00');
  const [value, setValue] = useState(initialAmount || 50);

  const handleAmountChange = (delta) => {
    const newAmount = amount + delta;
    if (newAmount >= 0) {
      setAmount(newAmount);
      setValue(newAmount);
    }
  };

  const handleSave = () => {
    onSave({ amount, time, value });
    onClose();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2>{initialAmount ? 'Edit the entered amount of water' : 'Add water'}</h2>
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
            onChange={(e) => setTime(e.target.value)} 
          />
        </div>
        <div className={styles.field}>
          <label>Enter the value of the water used:</label>
          <input 
            type="number" 
            value={value} 
            onChange={(e) => setValue(parseInt(e.target.value))} 
          />
        </div>
        <button className={styles.saveButton} onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};


export default WaterModal;

