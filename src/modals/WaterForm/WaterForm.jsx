import css from './WaterForm.module.css';
import Iconsvg from '../../components/Icon/Icon';
import { useState } from 'react';
import { addWater, updateWater } from '../../redux/water/operations.js';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import {
  dispatch,
  //  useSelector
} from 'react-redux';
// import { selectToken } from '../../redux/users/selectors';

const isDateTimeValid = date => new Date(date) <= new Date();
const schemaWaterForm = yup.object().shape({
  waterAmount: yup
    .number()
    .typeError('Please enter a valid number')
    .min(50, 'Minimum value is 50')
    .max(5000, 'Maximum value is 5000')
    .required('Water amount is required'),
  recordingTime: yup
    .string()
    .required('Recording time is required')
    .test('is-valid-datetime', 'Invalid date and time', isDateTimeValid),
});

const WaterForm = ({
  operationType,
  closeModal,
  id,
  //  date,
  // volume,
}) => {
  // const dispatch = useDispatch();
  let initialWaterAmount = operationType === 'edit' ? 250 : 50;
  const [number, setNumber] = useState(initialWaterAmount);
  const [maxValue, setMaxValue] = useState(0);
  const [minValue, setMinValue] = useState(0);
  console.log(id);
  // const token = useSelector(selectToken);
  const {
    register,
    handleSubmit,
    // errors
  } = useForm({
    validationSchema: schemaWaterForm,
  });

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

  const onSubmit = async data => {
    // const newPortionWater = {
    //   date: date,
    //   time: data.time,
    //   volume: data.volume,
    // };

    // const newPortionWater = {
    //   date: data.date,
    //   time: data.time,
    //   volume: data.waterAmount,
    // };
    // const date = new Date();

    try {
      if (operationType === 'edit') {
        await dispatch(updateWater(id));
      } else {
        await dispatch(addWater());
      }
      toast.success('Запит успішно виконано');
      closeModal();
    } catch (error) {
      toast.error('Помилка при виконанні');
      console.error('Помилка при виконанні:', error);
    }
   
  };
  
  return (
    <form className={css.waterForm} onSubmit={handleSubmit(onSubmit)}>
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
        {...register('time')}
      />
      {/* <div className={css.divError}>
        {errors.time && <p>{errors.time.message}</p>}
      </div> */}
      <p className={css.valueLabel}>Enter the value of the water used:</p>
      <input
        className={css.input2}
        type="number"
        value={number}
        onChange={e => setNumber(Math.min(Math.max(e.target.value, 50), 5000))}
      />
      {/* <div className={css.divError}>
        {errors.waterAmount && <p>{errors.waterAmount.message}</p>}
      </div> */}
      <button className={css.btnSave} type="submit">
        Save
      </button>
    </form>
  );
};

export default WaterForm;
/**============================================= */

// const onSubmit = data => {
//   console.log(data);
//   dispatch(addWater({ data, token, volume }));
//   closeModal();
// };

// const onSubmit = (data, volume) => {
//   const { time } = data;
//   const { volume } = volume;
//   const recordingDateTime = `${new Date().toISOString().split('T')[0]} ${time}`;
//   console.log('Recording date and time:', recordingDateTime);
//   console.log('Water volume:', volume);
//   closeModal();
// };

// Форматуємо дату в формат YYYY-MM-DD
//   const initDate = new Date(selectDay);
//   const year = initDate.getFullYear();
//   const month = String(initDate.getMonth() + 1).padStart(2, '0'); // Місяці від 0 до 11
//   const day = String(initDate.getDate()).padStart(2, '0'); // Дні від 1 до 31

//   const timestamp = '2024-06-25T00:00:00.000Z';
//   const date = new Date(timestamp);
//   const time = date.toLocaleTimeString('uk-UA', {
//     hour: '2-digit',
//     minute: '2-digit',
//     second: '2-digit',
//   });

//   {
//     "user": "667dc37e738219e7717c8a2b",
//     "date": "2024-06-23T00:00:00.000Z",
//     "volume": 90,
//     "_id": "667e8e25b4b90a52911252b6",
//     "createdAt": "2024-06-28T10:19:17.929Z",
//     "updatedAt": "2024-06-28T10:19:17.929Z"
// }

// console.log(time); // "03:00:00"

// new Date().toISOString();

// defaultValue={time}
// onChange={e => setIsTime(e.target.value)}
// import css from './WaterForm.module.css';
// import Iconsvg from '../../components/Icon/Icon';
// import { useState } from 'react';
// // import { toast } from 'react-toastify';
// import { useDispatch,
//   //  useSelector
//    } from 'react-redux';
// // import { selectDate } from '../../redux/water/selectors';
// import { addWater,
//   //  updateWater
//    } from '../../redux/water/operations.js';
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

// const WaterForm = ({
//   operationType,
//   closeModal,
//   // waterId,
//   volume,
//   // id,
//   // date
// }) => {
//   const dispatch = useDispatch();
//   const {
//     // register,
//     // handleSubmit,
//     handleAdd,
//     // errors
//   } = useForm({
//     validationSchema: schemaWaterForm,
//   });
//   // const date = useSelector(selectDate);
//   // const [isTime, setIsTime] = useState('');
//   let initialWaterAmount = operationType === 'edit' ? volume : 50;
//   const [number, setNumber] = useState(initialWaterAmount);
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

//   const onSubmit = data => {
//     console.log(data);
//     dispatch(addWater(data));
//     closeModal();

//   };

//   // const onSubmit = async data => {
//   //   // const newPortionWater = {
//   //   //   date: date,
//   //   //   time: data.time,
//   //   //   volume: data.volume,
//   //   // };

//   //   // const newPortionWater = {
//   //   //   date: data.date,
//   //   //   time: data.time,
//   //   //   volume: data.waterAmount,
//   //   // };
//   //   // const date = new Date();

//   //   try {
//   //     if (operationType === 'edit') {
//   //       await dispatch(updateWater(id));
//   //     } else {
//   //       await dispatch(addWater(newPortionWater));
//   //     }
//   //     toast.success('Запит успішно виконано');
//   //     closeModal();
//   //   } catch (error) {
//   //     toast.error('Помилка при виконанні');
//   //     console.error('Помилка при виконанні:', error);
//   //   }
//   //   console.log(date);
//   //   console.log(data);
//   //   console.log(newPortionWater);
//   // };
//   // console.log(date);
//   return (
//     <form className={css.waterForm}
//     // onSubmit={handleSubmit(onSubmit)}
//     onSubmit={handleAdd(onSubmit)}
//     >
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
//         <span className={css.numberMl}>{number} ml</span>
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

//       <input
//         className={css.inputTime}
//         type="time"
//         name="time"
//         // value={time}
//         // value={date}
//         // onChange={e => setIsTime(e.target.value)}
//       />
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
//   );
// };

// export default WaterForm;

// const handleEdit = (e, formData) => {
//   e.preventDefault();
//   dispatch(updateWater(formData));
//   closeModal();
// };

// const handleAdd = (e, formData) => {
//   e.preventDefault();
//   dispatch(addWater(formData));
//   closeModal();
// };

{
  /* {operationType === 'edit' ? (
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
          {/* Додала по замовчуванню заповнення даними з картки */
}
{
  /* треба змінити формат дати на час */
}
{
  /* <input
            className={css.inputTime}
            type={date}
            name="time"
            value="07:00"
          />
          <p className={css.valueLabel}>Enter the value of the water used:</p>
          {/* Додала по замовчуванню заповнення даними з картки */
}
{
  /* <input
            className={css.input2}
            type="number"
            value={volume}
            onChange={e =>
              setNumber(Math.min(Math.max(e.target.value, 50), 5000))
            } */
}
{
  /* />
          <button
            className={css.btnSave}
            type="submit"
            // onClick={handleEdit}
          >
            Save
          </button>
        </form> */
}
{
  /* ) : ( */
}

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
