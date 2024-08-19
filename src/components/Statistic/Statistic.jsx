import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
  ResponsiveContainer,
} from 'recharts';
import { eachDayOfInterval, format, subDays } from 'date-fns';

import css from './Statistic.module.css';
import Loader from '../../shared/components/Loader/Loader';
import { paginationDate } from '../../redux/date/selectors';
import { selectToken } from '../../redux/users/selectors';
import { fetchMonthlyWater } from '../../redux/water/operations';

import {
  selectErrorWater,
  selectLoadingWater,
  selectMonth,
} from '../../redux/water/selectors';
import ErrorPage from '../../pages/ErrorPage';

const Statistic = () => {
  const { t } = useTranslation();
  const pagination = useSelector(paginationDate);
  const storePaginationDate = useMemo(() => new Date(pagination), [pagination]);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const loadingWater = useSelector(selectLoadingWater);
  const isErrorWater = useSelector(selectErrorWater);
  const waterPortions = useSelector(selectMonth);
  const date = new Date(useSelector(paginationDate));

  const startOfCurrentPeriod = subDays(date, 6);
  const endOfCurrentPeriod = date;

  // const startMonth = format(startOfCurrentPeriod, 'MMMM yyyy');
  // const endMonth = format(endOfCurrentPeriod, 'MMMM yyyy');

  // const isDifferentMonths = startMonth !== endMonth;
  // console.log(isDifferentMonths);

  const weekDates = eachDayOfInterval({
    start: startOfCurrentPeriod,
    end: endOfCurrentPeriod,
  }).map(date => format(date, 'yyyy-MM-dd'));

  const waterPortionsPeriod = waterPortions.map(el => ({
    date: format(new Date(el.date), 'yyyy-MM-dd'),
    volume: el.volume / 1000,
  }));

  const filteredData = waterPortionsPeriod.filter(({ date }) =>
    weekDates.includes(date)
  );

  const finalData = useMemo(() => {
    const volumeByDate = filteredData.reduce((acc, { date, volume }) => {
      acc[date] = (acc[date] || 0) + volume;
      return acc;
    }, {});
    return weekDates.map(date => ({
      date,
      Water: volumeByDate[date] || 0,
    }));
  }, [weekDates, filteredData]);

  const gradientId = 'waterGradient';

  useEffect(() => {
    if (token) {
      dispatch(
        fetchMonthlyWater({
          month: storePaginationDate.getMonth() + 1,
          year: storePaginationDate.getFullYear(),
          token,
        })
      );
    }
  }, [dispatch, token, storePaginationDate]);

  if (loadingWater) {
    return <Loader />;
  }

  if (isErrorWater) {
    return <ErrorPage />;
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={css.customTooltip}>
          <p className={css.water}>{`${Math.round(payload[0].value * 1000)} ${t(
            'trackerPage.ml'
          )}`}</p>
        </div>
      );
    }
    return null;
  };

  const formatYAxis = tickItem => {
    return tickItem === 0 ? '0' : `${tickItem} ${t('trackerPage.liter')}`;
  };

  const formatXAxis = tickItem => {
    return format(new Date(tickItem), 'dd.MM');
  };

  return (
    <div className={css.statistics}>
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
            tickFormatter={formatXAxis}
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
