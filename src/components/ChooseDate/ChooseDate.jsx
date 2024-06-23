import css from './ChooseDate.module.css';

const ChooseDate = ({ formattedDate }) => {
  return <h3 className={css.cardTitle}>{formattedDate}</h3>;
};

export default ChooseDate;
