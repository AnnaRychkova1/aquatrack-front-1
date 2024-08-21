import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
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
  const [lastFetchedPeriod, setLastFetchedPeriod] = useState(null);
  const [firstMonthData, setFirstMonthData] = useState([]);
  const [secondMonthData, setSecondMonthData] = useState([]);

  const startOfCurrentPeriod = subDays(storePaginationDate, 6);
  const endOfCurrentPeriod = storePaginationDate;

  const weekDates = eachDayOfInterval({
    start: startOfCurrentPeriod,
    end: endOfCurrentPeriod,
  }).map(date => format(date, 'yyyy-MM-dd'));

  const combinedData = [...firstMonthData, ...secondMonthData].map(el => ({
    date: format(new Date(el.date), 'yyyy-MM-dd'),
    volume: el.volume / 1000,
  }));

  const volumeByDateMonth = combinedData.reduce((acc, { date, volume }) => {
    acc[date] = (acc[date] || 0) + volume;
    return acc;
  }, {});

  const finalData = weekDates.map(date => ({
    date,
    Water: volumeByDateMonth[date] || 0,
  }));

  const gradientId = 'waterGradient';

  const startMonth = startOfCurrentPeriod.getMonth() + 1;
  const endMonth = endOfCurrentPeriod.getMonth() + 1;
  const startYear = startOfCurrentPeriod.getFullYear();
  const endYear = endOfCurrentPeriod.getFullYear();

  useEffect(() => {
    if (token) {
      if (
        !lastFetchedPeriod ||
        startMonth !== lastFetchedPeriod.startMonth ||
        startYear !== lastFetchedPeriod.startYear ||
        endMonth !== lastFetchedPeriod.endMonth ||
        endYear !== lastFetchedPeriod.endYear
      ) {
        dispatch(
          fetchMonthlyWater({
            month: startMonth,
            year: startYear,
            token,
          })
        ).then(response => {
          setFirstMonthData(response.payload);
        });

        if (startMonth !== endMonth || startYear !== endYear) {
          dispatch(
            fetchMonthlyWater({
              month: endMonth,
              year: endYear,
              token,
            })
          ).then(response => {
            setSecondMonthData(response.payload);
          });
        }

        setLastFetchedPeriod({ startMonth, startYear, endMonth, endYear });
      }
    }
  }, [
    dispatch,
    token,
    startMonth,
    startYear,
    endMonth,
    endYear,
    lastFetchedPeriod,
  ]);

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

  if (loadingWater) {
    return <Loader />;
  }

  if (isErrorWater) {
    return <ErrorPage />;
  }

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
