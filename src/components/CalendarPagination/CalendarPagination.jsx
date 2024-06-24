// import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { selectDate } from '../../redux/date/selectors';

const CalendarPagination = () => {
  const storeMonth = new Date(useSelector(selectDate));
  const formattedMonth = `${storeMonth.toLocaleDateString('en-GB', {
    month: 'long',
  })}`;
  return <div>{formattedMonth}</div>;
};

export default CalendarPagination;
