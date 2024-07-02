import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
  ResponsiveContainer,
} from 'recharts';
import css from './Statistic.module.css';
import { format, subDays,  getMonth, getYear, } from 'date-fns';
import { paginationDate } from '../../redux/date/selectors';
import { selectToken } from '../../redux/users/selectors';
import { fetchMonthlyWater } from '../../redux/water/operations';
import { selectDate } from '../../redux/date/selectors';

const Statistic = ({data}) => {

  const storePaginationDate = new Date(useSelector(paginationDate));
  const selectedDate = useSelector(selectDate);
  
  const month = getMonth(storePaginationDate) + 1;
  const year = getYear(storePaginationDate);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token) {
      dispatch(fetchMonthlyWater({ month, year, token }));
    }
  }, [dispatch, month, year, token]);

  const waterPortions = data.map(el => {
    return { date: format(el.date, 'dd.MM.yyyy'), volume: el.volume / 1000 };
  })

  const arrayDates = [];
  for (let i = 6; i >= 0; i--) {
    arrayDates.push(format(subDays(selectedDate, i), 'dd.MM.yyyy'));
  }

  const finalData= arrayDates.map(date => {
    let a = 0;
    waterPortions.forEach(el => {
      if (date === el.date) {
        a += el.volume;
      }
    });

    if (a > 0) {
      a = a.toFixed(3);
    }

    return { date: date.split('.')[0], Water: a };
  });

  const gradientId = 'waterGradient';

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={css.customTooltip}>
          <p className={css.water}>{`${payload[0].value * 1000} ml`}</p>
        </div>
      );
    }
    return null;
  };
  const formatYAxis = tickItem => {
    if (tickItem === 0) {
      return '0';
    }
    return `${tickItem} L`;
  };

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={finalData}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9BE1A0" stopOpacity={1} />
              <stop offset="100%" stopColor="#9BE1A0" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3" stroke="none" />
          <XAxis
            dataKey="date"
            padding={{ left: 20, right: 20 }}
            tickSize={false}
            tickLine={false}
            tick={{ fill: 'var(--main-text)' }}
            stroke=""
          />
          <YAxis
            padding={{ top: 20, bottom: 20 }}
            tickSize={false}
            tickLine={false}
            tick={{ fill: 'var(--main-text)' }}
            stroke=""
            tickFormatter={formatYAxis}
          />
          <Area
            dataKey="Water"
            dot={{
              stroke: '#87D28D',
              strokeWidth: 3,
              r: 9,
              fill: '#fff',
              fillOpacity: '1',
            }}
            stroke="#87D28D"
            strokeWidth={3}
            fill={`url(#${gradientId})`}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: '' }}
            position={{ y: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Statistic;