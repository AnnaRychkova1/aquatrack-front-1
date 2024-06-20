import WaterItem from "../WaterItem/WaterItem";
import css from "./WaterList.modal.css";

const WaterList = () => {
	return (
		<ul className={css.list}>
			<WaterItem />
			<WaterItem />
			<WaterItem />
			<WaterItem />
			<WaterItem />
		</ul>
	);
};

export default WaterList;
