import css from './WaterForm.module.css';
import Iconsvg from '../../components/Icon/Icon';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addWater, updateWater } from '../../redux/water/operations.js';
// import * as yup from 'yup';
// import { useForm } from 'react-hook-form';

// const schemaWaterForm = yup.object().shape({
//   waterAmount: yup
//     .number()
//     .typeError('Please enter a valid number')
//     .min(50, 'Minimum value is 50')
//     .max(5000, 'Maximum value is 5000')
//     .required('Water amount is required'),
//   recordingTime: yup.string().required('Recording time is required'),
// });

const WaterForm = ({ operationType, closeModal, id, date, volume }) => {
  const dispatch = useDispatch();
  let initialWaterAmount = operationType === 'edit' ? 250 : 50;
  const [number, setNumber] = useState(initialWaterAmount);
  const [maxValue, setMaxValue] = useState(0);
  const [minValue, setMinValue] = useState(0);
  console.log(id);
  const incrementNumber = e => {
    e.preventDefault();
    const newNumber = Math.min(number + 50, 5000);
    setNumber(newNumber);
    setMaxValue(Math.max(maxValue, newNumber));
  };

  const decrementNumber = e => {
    e.preventDefault();
    const newNumber = Math.max(number - 50, 50);
    setNumber(newNumber);
    setMinValue(Math.min(minValue, newNumber));
  };

  const handleEdit = (e, formData) => {
    e.preventDefault();
    dispatch(updateWater(formData));
    closeModal();
  };

  const handleAdd = (e, formData) => {
    e.preventDefault();
    dispatch(addWater(formData));
    closeModal();
  };

  // const onSubmit = data => {
  //   console.log(data);
  //   dispatch(addWater(data));
  //   closeModal();

  // };

  return (
    <>
      {operationType === 'edit' ? (
        // Форма для внесення змін
        <form className={css.waterForm}>
          <p className={css.amountWaterLabel}>Amount of water:</p>
          <div className={css.btnBox}>
            <button className={css.btnReduce} onClick={decrementNumber}>
              <Iconsvg
                width="18"
                height="18"
                iconName="minus"
                className={css.btnSvg}
              />
            </button>
            <span className={css.numberMl}>{number} ml</span>
            <button className={css.btnZoom} onClick={incrementNumber}>
              <Iconsvg
                width="18"
                height="18"
                iconName="plus"
                className={css.btnSvg}
              />
            </button>
          </div>
          <p className={css.timeLabel}>Recording time:</p>
          {/* Додала по замовчуванню заповнення даними з картки */}
          {/* треба змінити формат дати на час */}
          <input
            className={css.inputTime}
            type={date}
            name="time"
            value="07:00"
          />
          <p className={css.valueLabel}>Enter the value of the water used:</p>
          {/* Додала по замовчуванню заповнення даними з картки */}
          <input
            className={css.input2}
            type="number"
            value={volume}
            onChange={e =>
              setNumber(Math.min(Math.max(e.target.value, 50), 5000))
            }
          />
          <button className={css.btnSave} type="submit" onClick={handleEdit}>
            Save
          </button>
        </form>
      ) : (
        // Форма для додавання
        <form
          className={css.waterForm}
          // onSubmit={handleSubmit(onSubmit)}
          onSubmit={handleAdd(onSubmit)}
        >
          <p className={css.amountWaterLabel}>Amount of water:</p>
          <div className={css.btnBox}>
            <button className={css.btnReduce} onClick={decrementNumber}>
              <Iconsvg
                width="18"
                height="18"
                iconName="minus"
                className={css.btnSvg}
              />
            </button>
            <span className={css.numberMl}>{number} ml</span>
            <button className={css.btnZoom} onClick={incrementNumber}>
              <Iconsvg
                width="18"
                height="18"
                iconName="plus"
                className={css.btnSvg}
              />
            </button>
          </div>
          <p className={css.timeLabel}>Recording time:</p>

          <input
            className={css.inputTime}
            type="time"
            name="time"
            // value={time}
            // value={date}
            // onChange={e => setIsTime(e.target.value)}
          />
          <p className={css.valueLabel}>Enter the value of the water used:</p>
          <input
            className={css.input2}
            type="number"
            value={number}
            onChange={e =>
              setNumber(Math.min(Math.max(e.target.value, 50), 5000))
            }
          />

          <button className={css.btnSave} type="submit">
            Save
          </button>
        </form>
      )}
    </>
  );
};

export default WaterForm;
/**============================================= */

// function myProps() {
// const isEdit = operationType === 'edit';
// const initialWaterAmount =  operationType === 'edit' ? { volume } : 50;
// const [number, setNumber] = useState(initialWaterAmount);
// }
{
  /* <h3 className={css.title}>
        {operationType ? 'Edit the entered amount of water' : 'Add water'}
      </h3>
      <p className={css.subtitle}>
        {operationType ? 'Correct entered data:' : 'Choose a value'}
      </p> */
}

// function myProps() {
//   const isEdit = operationType === 'edit';
//   const initialWaterAmount = isEdit ? { volume } : 50;
//   const [number, setNumber] = useState(initialWaterAmount);
// }

// import  { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import * as yup from 'yup';

// const schema = yup.object().shape({
//   waterAmount: yup
//     .number()
//     .typeError('Please enter a valid number')
//     .min(50, 'Minimum value is 50')
//     .max(5000, 'Maximum value is 5000')
//     .required('Water amount is required'),
//   recordingTime: yup.string().required('Recording time is required'),
// });

// const WaterForm = ({ operationType }) => {
//   const { register, handleSubmit, errors } = useForm({
//     validationSchema: schema,
//   });

//   const [waterAmount, setWaterAmount] = useState(50);

//   const onSubmit = data => {

//     console.log('Form data:', data);
//   };

//   const incrementWaterAmount = () => {
//     setWaterAmount(prevAmount => Math.min(prevAmount + 50, 5000));
//   };

//   const decrementWaterAmount = () => {
//     setWaterAmount(prevAmount => Math.max(prevAmount - 50, 50));
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <h3>
//         {operationType ? 'Edit the entered amount of water' : 'Add water'}
//       </h3>
//       <div>
//         <label>Amount of water:</label>
//         <div>
//           <button type="button" onClick={decrementWaterAmount}>
//             -
//           </button>
//           <input
//             type="number"
//             name="waterAmount"
//             value={waterAmount}
//             onChange={e => setWaterAmount(e.target.value)}
//             ref={register}
//           />
//           <span>ml</span>
//           <button type="button" onClick={incrementWaterAmount}>
//             +
//           </button>
//         </div>
//         {errors.waterAmount && <p>{errors.waterAmount.message}</p>}
//       </div>
//       <div>
//         <label>Recording time:</label>
//         <input type="time" name="recordingTime" ref={register} />
//         {errors.recordingTime && <p>{errors.recordingTime.message}</p>}
//       </div>
//       <button type="submit">Save</button>
//     </form>
//   );
// };

// export default WaterForm;

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
