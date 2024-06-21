import Iconsvg from "../Icon/Icon";
import css from "./WaterItem.module.css";

const WaterItem = () => {
	return (
		<div className={css.waterCard}>
			<Iconsvg width="38" height="38" iconName="mage_water-glass-fill" styles={css.waterglass} />
			<div className={css.waterInfo}>
				<p className={css.volume}>250 ml</p>
				<p className={css.time}>10:20 AM</p>
			</div>
			<div className={css.waterButtons}>
				<button className={css.button} type="button" aria-label="Edit water value">
					<Iconsvg width="14" height="14" iconName="edit" styles={css.waterButtonSvg} />
				</button>
				<button className={css.button} type="button" aria-label="Delete item">
					<Iconsvg width="14" height="14" iconName="trash" styles={css.waterButtonSvg} />
				</button>
			</div>
		</div>
	);
};

export default WaterItem;
