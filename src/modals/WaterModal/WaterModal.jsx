import UniversalModal from '../Modal/Modal';
import WaterForm from '../WaterForm/WaterForm';
import css from './WaterModal.module.css';

const WaterModal = ({ isOpen, closeModal, operationType }) => {
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
        <WaterForm operationType={operationType} closeModal={closeModal} />
      </div>
    </UniversalModal>
  );
};

export default WaterModal;

// import { useState } from 'react';
// import WaterForm from '../../components/WaterForm/WaterForm';

// initialAmount,
// initialTime,
// onSave,

//       <div className={styles.modalWrap}>
//         <h2>
//           {initialAmount ? 'Edit the entered amount of water' : 'Add water'}
//         </h2>

// const [amount, setAmount] = useState(initialAmount || 50);
// const [time, setTime] = useState(initialTime || '7:00');
// const [value, setValue] = useState(initialAmount || 50);

// const handleAmountChange = delta => {
//   const newAmount = amount + delta;
//   if (newAmount >= 0) {
//     setAmount(newAmount);
//     setValue(newAmount);
//   }
// };

// const handleSave = () => {
//   onSave({ amount, time, value });
//   closeModal();
// };

//         <WaterForm />
//         <div className={styles.field}>
//           <label>Amount of water:</label>
//           <div className={styles.amountControl}>
//             <button onClick={() => handleAmountChange(-50)}>-</button>
//             <span>{amount} ml</span>
//             <button onClick={() => handleAmountChange(50)}>+</button>
//           </div>
//         </div>
//         <div className={styles.field}>
//           <label>Recording time:</label>
//           <input
//             type="time"
//             value={time}
//             onChange={e => setTime(e.target.value)}
//           />
//         </div>
//         <div className={styles.field}>
//           <label>Enter the value of the water used:</label>
//           <input
//             type="number"
//             value={value}
//             onChange={e => setValue(parseInt(e.target.value))}
//           />
//         </div>
//         <button className={styles.saveButton} onClick={handleSave}>
//           Save
//         </button>
//       </div>
