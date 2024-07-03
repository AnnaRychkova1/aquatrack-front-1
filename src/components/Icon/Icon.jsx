
// import sprite from "/src/assets/images/svg/sprite.svg";
import sprite from "/src/assets/images/svg/symbol-defs.svg";

const Iconsvg = ({ width, height, iconName, className }) => {
  return (
    // <svg width={width} height={height} className={className}>
    //   <use href={`${sprite}#${iconName}`}></use>
    // </svg>
    <svg width={width} height={height} className={className}>
      <use xlinkHref={`${sprite}#${iconName}`}></use> 
    </svg>
  );
};

export default Iconsvg;
