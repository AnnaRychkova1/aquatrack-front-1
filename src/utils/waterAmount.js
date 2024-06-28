// import { useSelector } from 'react-redux';
// import { selectWaterDrink } from '../../redux/users/selectors';

export const calculateWaterAmount = () => {
  //   const daylyNorm = useSelector(selectWaterDrink);
  //   const dayWaterAll = useSelector(selectDayWaterAll);

  const daylyNorm = 2;
  const dayWaterAll = [{ value: 100 }, { value: 500 }, { value: 500 }];

  const allDrinkedWater = dayWaterAll.reduce((accumulator, currentObject) => {
    return accumulator + currentObject.value;
  }, 0);

  let waterAmount = 0;
  if (allDrinkedWater) {
    if (daylyNorm) {
      waterAmount = (allDrinkedWater * 100) / (daylyNorm * 1000);
    } else {
      waterAmount = 100;
    }
  }
  return Math.min(waterAmount, 100);
};
