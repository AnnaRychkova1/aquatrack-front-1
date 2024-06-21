import WaterList from "../WaterList/WaterList";
import css from "./DailyInfo.module.css";
import Iconsvg from "../Icon/Icon";

const DailyInfo = () => {
	return (
		<div className={css.wrapper}>
			<div className={css.cardHeader}>
				<h3 className={css.cardTitle}>Today</h3>
				<button className={css.cardButton} type="button" aria-label="Add water">
					<Iconsvg width="30" height="30" iconName="plus_dark" styles={css.cardIcon} />
					<span className={css.cardButtonTitle}>Add water</span>
				</button>
			</div>
			<WaterList />
		</div>
	);
};

export default DailyInfo;
