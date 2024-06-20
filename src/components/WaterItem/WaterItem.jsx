import css from "./WaterItem.module.css";

const WaterItem = () => {
	return (
		<div className={css.waterCard}>
			<svg className={css.waterglass} width="38" height="38">
				<use href="/src/assets/images/svg/sprite.svg#mage_water-glass-fill" width="27.64" height="30.4"></use>
			</svg>
			<div className={css.waterInfo}>
				<p className={css.volume}>250 ml</p>
				<p className={css.time}>10:20 AM</p>
			</div>

			<div className={css.waterButtons}>
				<button className={css.button} type="button">
					<svg className={css.waterglass} width="14" height="14">
						<use href="/src/assets/images/svg/sprite.svg#edit" width="11.57" height="11.57"></use>
					</svg>
				</button>
				<button className={css.button} type="button">
					<svg className={css.waterglass} width="14" height="14">
						<use href="/src/assets/images/svg/sprite.svg#trash" width="14" height="14"></use>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default WaterItem;
