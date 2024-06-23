// import clsx from "clsx";
import Iconsvg from "../../Icon/Icon";
import css from "./AddWaterBtn.module.css";

const AddWaterBtn = () => {
  return (
    <div className={css.contBtn}>
      <button
        className={css.btn}
        type="button"
        // onClick={}
      >
        <Iconsvg width="16" height="16" iconName="plus" className={css.icon} />

        <span className={css.textBtn}>Add Water</span>
      </button>
    </div>
  );
};

export default AddWaterBtn;
