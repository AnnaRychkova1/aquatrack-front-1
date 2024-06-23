import WaterItem from '../WaterItem/WaterItem';
import waterL from './waterL.json';
import css from './WaterList.module.css';

const WaterList = () => {
  return (
    <ul className={css.list}>
      {waterL.map(waterItem => {
        return (
          <li className={css.item} key={waterItem.id}>
            <WaterItem
              id={waterItem.id}
              volume={waterItem.volume}
              time={waterItem.time}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default WaterList;
