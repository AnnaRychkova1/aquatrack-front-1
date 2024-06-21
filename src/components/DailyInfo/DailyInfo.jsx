import WaterList from "../WaterList/WaterList";
import css from "./DailyInfo.module.css";
const DailyInfo = () => {
	return (
		<div className={css.wrapper}>
			<div className={css.cardHeader}>
				<h3 className={css.cardTitle}>Today</h3>
				<button className={css.cardButton} type="button">
					<svg className={css.cardIcon} width="30" height="30">
						{/* <use className={css.cardIconPlus} href="/src/assets/images/svg/sprite.svg#plus"></use> */}
						<path fill="none" d="M15 9.64307V20.3574" stroke="#323F47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						<path fill="none" d="M9.64286 15H20.3571" stroke="#323F47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
					<span className={css.cardButtonTitle}>Add water</span>
				</button>
			</div>
			<WaterList />
		</div>
	);
};

export default DailyInfo;
