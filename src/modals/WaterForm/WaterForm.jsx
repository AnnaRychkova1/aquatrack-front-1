import css from './WaterForm.module.css';
import Iconsvg from '../../components/Icon/Icon';
import { useState } from 'react';
import { addWater, updateWater } from '../../redux/water/operations.js';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../../redux/users/selectors';

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
  const dispatch = useDispatch();
  let initialWaterAmount = operationType === 'edit' ? 250 : 50;
  const [number, setNumber] = useState(initialWaterAmount);
  const [maxValue, setMaxValue] = useState(0);
  const [minValue, setMinValue] = useState(0);
  console.log(id);
  const token = useSelector(selectToken);
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

  const onSubmit = async ({ time, value }) => {
    const recordingDateTime = `${
      new Date().toISOString().split('T')[0]
    } ${time}`;
    try {
      if (operationType === 'edit') {
        await dispatch(updateWater(id));
      } else {
        await dispatch(
          addWater({ data: recordingDateTime, volume: value, token })
        );
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
        value="07:00"
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
