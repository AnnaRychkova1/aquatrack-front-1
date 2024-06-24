// import UniversalModal from '../Modal/Modal';
import css from './WaterForm.module.css';
import Iconsvg from '../../components/Icon/Icon';
import { useState } from 'react';

const WaterForm = () => {
  const [number, setNumber] = useState(50);
  const [maxValue, setMaxValue] = useState(0);
  const [minValue, setMinValue] = useState(0);

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

  return (
    // <UniversalModal>
    <form className={css.waterForm}>
      <h3 className={css.title}>Add water</h3>
      <p className={css.subtitle}>Choose a value</p>
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
        <input className={css.input1} type="number" value={number} readOnly />
        <span className={css.ml}>ml</span>
        <button className={css.btnZoom} onClick={incrementNumber}>
          <Iconsvg
            width="18"
            height="18"
            iconName="plus1"
            className={css.btnSvg}
          />
        </button>
      </div>
      <p className={css.timeLabel}>Recording time:</p>

      <input
        className={css.inputTime}
        type="time"
        id="myTime"
        value="07:00"
      ></input>

      <p className={css.valueLabel}>Enter the value of the water used:</p>

      <input
        className={css.input2}
        type="number"
        value={number}
        onChange={e => setNumber(Math.min(Math.max(e.target.value, 50), 5000))}
      />

      <button className={css.btnSave} type="submit">
        Save
      </button>
    </form>
    // </UniversalModal>
  );
};

export default WaterForm;
