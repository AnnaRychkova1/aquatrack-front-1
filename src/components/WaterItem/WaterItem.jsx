import css from "./WaterItem.modal.css";

const WaterItem = () => {
	return (
		<div className={css.waterCard}>
			<svg className={css.waterglass} width="38" height="38">
				<use href="/src/assets/images/svg/sprite.svg#mage_water-glass-fill"></use>
			</svg>
			<div className={css.waterInfo}>
				<p className={css.volume}>250 ml</p>
				<p className={css.time}>10:20 AM</p>
			</div>

			<div className={css.waterButtons}>
				<button className={css.button} type="button">
					<svg className={css.waterglass} width="14" height="14">
						<use href="/src/assets/images/svg/sprite.svg#edit"></use>
					</svg>
				</button>
				<button className={css.button} type="button">
					<svg className={css.waterglass} width="14" height="14">
						<use href="/src/assets/images/svg/sprite.svg#trash"></use>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default WaterItem;
