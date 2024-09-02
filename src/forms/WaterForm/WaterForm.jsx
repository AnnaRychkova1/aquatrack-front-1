import { useState, useEffect } from 'react';
import { addWater, updateWater } from '../../redux/water/operations.js';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import css from './WaterForm.module.css';
import Iconsvg from '../../shared/components/Icon/Icon.jsx';
import { selectDate } from '../../redux/date/selectors.js';
import { useModalContext } from '../../context/useModalContext.jsx';

const isDateTimeValid = date => new Date(date) <= new Date();
const schemaWaterForm = yup.object().shape({
  waterAmount: yup
    .number()
    .typeError('Please enter a valid number')
    .min(1, 'Minimum value is 1')
    .max(5000, 'Maximum value is 5000')
    .required('Water amount is required'),
  recordingTime: yup
    .string()
    .required('Recording time is required')
    .test('is-valid-datetime', 'Invalid date and time', isDateTimeValid),
});

const WaterForm = ({ operationType, id, myTime, volume }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { closeModal } = useModalContext();
  let initialWaterAmount = operationType === 'edit' ? volume : 50;
  const [number, setNumber] = useState(initialWaterAmount);
  const [maxValue, setMaxValue] = useState(0);
  const [minValue, setMinValue] = useState(0);
  const [currentTime, setCurrentTime] = useState(myTime || '');

  const { handleSubmit } = useForm({
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

  useEffect(() => {
    if (operationType !== 'edit') {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const formattedTime = `${hours}:${minutes}`;
      setCurrentTime(formattedTime);
    }
  }, [operationType]);

  const dateString = useSelector(selectDate);

  const date = new Date(dateString);

  const formattedDate = date.toISOString().split('T')[0];

  const timeFromInput = currentTime === undefined ? myTime : currentTime;
  const newDate = new Date(`${formattedDate}T${timeFromInput}`);

  const onSubmit = async () => {
    const formData = {
      date: newDate,
      volume: number,
    };

    if (operationType === 'edit') {
      dispatch(updateWater({ id, formData }));
    } else {
      dispatch(addWater({ formData }));
    }
    closeModal();
  };

  return (
    <form className={css.waterForm} onSubmit={handleSubmit(onSubmit)}>
      <p className={css.amountWaterLabel}>{t('modals.amount')}:</p>
      <div className={css.btnBox}>
        <button
          className={css.btnReduce}
          type={'button'}
          onClick={decrementNumber}
        >
          <Iconsvg
            width="24"
            height="24"
            iconName="minus"
            className={css.btnSvg}
          />
        </button>
        <span className={css.numberMl}>
          {number} {t('trackerPage.ml')}
        </span>
        <button
          className={css.btnZoom}
          type={'button'}
          onClick={incrementNumber}
        >
          <Iconsvg
            width="24"
            height="24"
            iconName="plus"
            className={css.btnSvg}
          />
        </button>
      </div>
      <p className={css.timeLabel}>{t('modals.recordingTime')}:</p>
      <input
        className={css.inputTime}
        type="time"
        name="time"
        value={currentTime}
        onChange={e => setCurrentTime(e.target.value)}
      />
      <p className={css.valueLabel}>{t('modals.enterValue')}:</p>
      <input
        className={css.input2}
        type="number"
        value={number}
        onChange={e => setNumber(Math.min(Math.max(e.target.value, 1), 5000))}
      />
      <button className={css.btnSave} type="submit">
        {t('modals.save')}
      </button>
    </form>
  );
};

export default WaterForm;
