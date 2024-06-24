
// код 1

// import css from './WaterForm.module.css';
// import Iconsvg from '../../components/Icon/Icon';
// import { useState } from 'react';

// const WaterForm = ({
//   // isOpen,
//   // closeModal,
//   operationType,
//   // onSave
// }) => {
//   const [number, setNumber] = useState(50);
//   const [maxValue, setMaxValue] = useState(0);
//   const [minValue, setMinValue] = useState(0);

//   const incrementNumber = e => {
//     e.preventDefault();
//     const newNumber = Math.min(number + 50, 5000);
//     setNumber(newNumber);
//     setMaxValue(Math.max(maxValue, newNumber));
//   };

//   const decrementNumber = e => {
//     e.preventDefault();
//     const newNumber = Math.max(number - 50, 50);
//     setNumber(newNumber);
//     setMinValue(Math.min(minValue, newNumber));
//   };

//   return (
//     // <UniversalModal isOpen={isOpen} closeModal={closeModal}>
//     <form className={css.waterForm}>
//       <h3 className={css.title}>
//         {operationType ? 'Edit the entered amount of water' : 'Add water'}
//       </h3>
//       <p className={css.subtitle}>
//         {operationType ? 'Correct entered data:' : 'Choose a value'}
//       </p>
//       <p className={css.amountWaterLabel}>Amount of water:</p>
//       <div className={css.btnBox}>
//         <button className={css.btnReduce} onClick={decrementNumber}>
//           <Iconsvg
//             width="18"
//             height="18"
//             iconName="minus"
//             className={css.btnSvg}
//           />
//         </button>
//         <input className={css.input1} type="number" value={number} readOnly />
//         <span className={css.ml}>ml</span>
//         <button className={css.btnZoom} onClick={incrementNumber}>
//           <Iconsvg
//             width="18"
//             height="18"
//             iconName="plus"
//             className={css.btnSvg}
//           />
//         </button>
//       </div>
//       <p className={css.timeLabel}>Recording time:</p>

//       <input className={css.inputTime} type="time" value="07:00"></input>

//       <p className={css.valueLabel}>Enter the value of the water used:</p>

//       <input
//         className={css.input2}
//         type="number"
//         value={number}
//         onChange={e => setNumber(Math.min(Math.max(e.target.value, 50), 5000))}
//       />

//       <button className={css.btnSave} type="submit">
//         Save
//       </button>
//     </form>
//     // </UniversalModal>
//   );
// };

// export default WaterForm;

// код 2

import  { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object().shape({
  waterAmount: yup
    .number()
    .typeError('Please enter a valid number')
    .min(50, 'Minimum value is 50')
    .max(5000, 'Maximum value is 5000')
    .required('Water amount is required'),
  recordingTime: yup.string().required('Recording time is required'),
});

const WaterForm = ({ operationType }) => {
  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });

  const [waterAmount, setWaterAmount] = useState(50);

  const onSubmit = data => {
    
    console.log('Form data:', data);
  };

  const incrementWaterAmount = () => {
    setWaterAmount(prevAmount => Math.min(prevAmount + 50, 5000));
  };

  const decrementWaterAmount = () => {
    setWaterAmount(prevAmount => Math.max(prevAmount - 50, 50));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>
        {operationType ? 'Edit the entered amount of water' : 'Add water'}
      </h3>
      <div>
        <label>Amount of water:</label>
        <div>
          <button type="button" onClick={decrementWaterAmount}>
            -
          </button>
          <input
            type="number"
            name="waterAmount"
            value={waterAmount}
            onChange={e => setWaterAmount(e.target.value)}
            ref={register}
          />
          <span>ml</span>
          <button type="button" onClick={incrementWaterAmount}>
            +
          </button>
        </div>
        {errors.waterAmount && <p>{errors.waterAmount.message}</p>}
      </div>
      <div>
        <label>Recording time:</label>
        <input type="time" name="recordingTime" ref={register} />
        {errors.recordingTime && <p>{errors.recordingTime.message}</p>}
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default WaterForm;

// код 2

// import css from './WaterForm.module.css';
// import Iconsvg from '../../components/Icon/Icon';
// import { useState } from 'react';

// const WaterForm = ({
//   // isOpen,
//   // closeModal,
//   operationType,
//   // onSave
// }) => {
//   const [number, setNumber] = useState(50);
//   const [maxValue, setMaxValue] = useState(0);
//   const [minValue, setMinValue] = useState(0);

//   const incrementNumber = e => {
//     e.preventDefault();
//     const newNumber = Math.min(number + 50, 5000);
//     setNumber(newNumber);
//     setMaxValue(Math.max(maxValue, newNumber));
//   };

//   const decrementNumber = e => {
//     e.preventDefault();
//     const newNumber = Math.max(number - 50, 50);
//     setNumber(newNumber);
//     setMinValue(Math.min(minValue, newNumber));
//   };

//   return (
//     // <UniversalModal isOpen={isOpen} closeModal={closeModal}>
//     <form className={css.waterForm}>
//       <h3 className={css.title}>
//         {operationType ? 'Edit the entered amount of water' : 'Add water'}
//       </h3>
//       <p className={css.subtitle}>
//         {operationType ? 'Correct entered data:' : 'Choose a value'}
//       </p>
//       <p className={css.amountWaterLabel}>Amount of water:</p>
//       <div className={css.btnBox}>
//         <button className={css.btnReduce} onClick={decrementNumber}>
//           <Iconsvg
//             width="18"
//             height="18"
//             iconName="minus"
//             className={css.btnSvg}
//           />
//         </button>
//         <input className={css.input1} type="number" value={number} readOnly />
//         <span className={css.ml}>ml</span>
//         <button className={css.btnZoom} onClick={incrementNumber}>
//           <Iconsvg
//             width="18"
//             height="18"
//             iconName="plus"
//             className={css.btnSvg}
//           />
//         </button>
//       </div>
//       <p className={css.timeLabel}>Recording time:</p>

//       <input className={css.inputTime} type="time" value="07:00"></input>

//       <p className={css.valueLabel}>Enter the value of the water used:</p>

//       <input
//         className={css.input2}
//         type="number"
//         value={number}
//         onChange={e => setNumber(Math.min(Math.max(e.target.value, 50), 5000))}
//       />

//       <button className={css.btnSave} type="submit">
//         Save
//       </button>
//     </form>
//     // </UniversalModal>
//   );
// };

// export default WaterForm;
