import WaterList from "../WaterList/WaterList";
import css from "./DailyInfo.module.css";
const DailyInfo = () => {
	return (
		<div className={css.wrapper}>
			<div className={css.cardHeader}>
				<p className={css.cardTitle}>Today</p>
				<button className={css.cardButton} type="button">
					<svg className={css.cardIconPlus} width="30" height="30">
						<use href="/src/assets/images/svg/sprite.svg#plus" width="10.71" height="10.71"></use>
					</svg>
					<span>Add water</span>
				</button>
			</div>
			<WaterList />
		</div>
	);
};

export default DailyInfo;
