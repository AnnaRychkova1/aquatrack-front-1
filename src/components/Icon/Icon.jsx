import sprite from "/src/assets/images/svg/symbol-defs.svg";

const Iconsvg = ({ width, height, iconName, styles }) => {
	return (
		<svg width={width} height={height} className={styles}>
			<use href={`${sprite}#${iconName}`}></use>
		</svg>
	);
};

export default Iconsvg;
