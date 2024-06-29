import css from './WaterProgressBar.module.css';
import Iconsvg from '../Icon/Icon';
import { useEffect, useState } from 'react';
// import { calculateWaterAmount } from '../../utils/waterAmount';
import { useSelector } from 'react-redux';
import { selectWaterDrink } from '../../redux/users/selectors';
// import { selectTotalDay } from '../../redux/water/selectors';

// const WaterProgressBar = () => {
//   const daylyNorm = useSelector(selectWaterDrink);
//   const dayWaterAll = useSelector(selectTotalDay);
//   // const dayWaterAll = [{ value: 500 }, { value: 100 }, { value: 500 }];

//   const [waterAmount, setWaterAmount] = useState(0);

//   useEffect(() => {
//     const calculateDrinkedWater = dayWaterAll.reduce(
//       (accumulator, currentObject) => {
//         return accumulator + currentObject.value;
//       },
//       0
//     );

//     let waterAmount = 0;
//     if (calculateDrinkedWater) {
//       if (daylyNorm) {
//         waterAmount = (calculateDrinkedWater * 100) / (daylyNorm * 1000);
//       } else {
//         waterAmount = 100;
//       }
//     }
//     setWaterAmount(Math.min(waterAmount, 100));
//   }, [daylyNorm, dayWaterAll]);

const WaterProgressBar = () => {
  const daylyNorm = useSelector(selectWaterDrink);
  // const dayWaterAll = useSelector(selectTotalDay);
  const dayWaterAll = [{ value: 500 }, { value: 1000 }, { value: 100 }];

  const [waterAmount, setWaterAmount] = useState(0);

  useEffect(() => {
    if (Array.isArray(dayWaterAll)) {
      const calculateDrinkedWater = dayWaterAll.reduce(
        (accumulator, currentObject) => accumulator + currentObject.value,
        0
      );

      let waterAmount = 0;
      if (calculateDrinkedWater) {
        if (daylyNorm) {
          waterAmount = (calculateDrinkedWater * 100) / (daylyNorm * 1000);
        } else {
          waterAmount = 100;
        }
      }
      setWaterAmount(Math.min(waterAmount, 100));
    } else {
      setWaterAmount(0);
    }
  }, [daylyNorm, dayWaterAll]);

  // console.log('Water Amount:', waterAmount);

  return (
    <div className={css.contBar}>
      <p className={css.textBar}>Today</p>
      <div className={css.waterProgressBarWrapper}>
        <div className={css.waterProgressBar}>
          <div
            className={css.waterProgressBarFiller}
            style={{
              width: `${waterAmount}%`,
            }}
          >
            <div className={css.waterProgressBarContent}>
              <Iconsvg width={24} height={24} iconName="water-progress-bar" />
              <span className={css.waterProgressBarLabel}>
                {`${Math.round(waterAmount)}%`}
              </span>
            </div>
          </div>
        </div>
        <div className={css.progressLabels}>
          <span className={css.progressLabelLeft}>0%</span>
          {/* <span className={css.progressLabelMid}>50%</span> */}
          <span className={css.progressLabelRight}>100%</span>
        </div>
      </div>
    </div>
  );
};

export default WaterProgressBar;

// const WaterProgressBar = () => {
//   const daylyNorm = useSelector(selectWaterDrink);
//   const dayWaterAll = useSelector();

//   const daylyNorm = 2;
//   const dayWaterAll = [{ value: 500 }, { value: 1000 }, { value: 100 }];

//   const allDrinkedWater = dayWaterAll.reduce((accumulator, currentObject) => {
//     return accumulator + currentObject.value;
//   }, 0);
//   let waterAmount = 0;

//   if (allDrinkedWater) {
//     if (daylyNorm) {
//       waterAmount = (allDrinkedWater * 100) / (daylyNorm * 1000);
//     } else {
//       waterAmount = 100;
//     }
//   }
//   waterAmount = Math.min(waterAmount, 100);

//   console.log('All Drinked Water:', allDrinkedWater);
