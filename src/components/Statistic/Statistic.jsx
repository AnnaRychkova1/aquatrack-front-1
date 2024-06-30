import { useSelector } from 'react-redux';
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
import { format, subDays } from 'date-fns';
// import { useTranslation } from 'react-i18next';
import { paginationDate } from '../../redux/date/selectors';

const Statistic = ({ data }) => {
    // const { t } = useTranslation();
    const currentDay = new Date(useSelector(paginationDate));
// --------------------------------------
    console.log(data);
    // створюю масив дат на тиждень
    const arrayDates = [];
    for (let i = 6; i >= 0; i--) {
        arrayDates.push(format(subDays(currentDay, i), 'dd.MM.yyyy'));
    }
    console.log(arrayDates);

    // створюю масив обʼєктів даних
    const arrayData = data.map(el => {
        return { date: format(el.date, 'dd.MM.yyyy'), Water: el.volume / 1000 };
    })
    console.log(arrayData);

    // 
    // const xxx = arrayDates.map(el => {
    //     const value = [];
    //     arrayData.forEach(data => {
    //         if (data.date === el) {
    //             value.push(data.Water);
    //         };
    //         ;
    //     });
    //     const totalWater = value.reduce((acc, val) => acc + val, 0);
    //     return { date: format(el, 'dd'), Water: totalWater };
    // });

    // console.log(xxx);
// const formattedChartData = formatDataForChart(filteredData);

    // function formatDataForChart(data) {
    //     const formattedData = [];

    //     const possibleDates = [];
    //     for (let i = daysRange - 1; i >= 0; i--) {
    //     possibleDates.push(format(subDays(currentDay, i), 'dd.MM.yyyy'));
    //     }
        
    //     possibleDates.forEach(date => {
    //     const foundData = data.find(el => el.date === date);
    //     if (foundData) {
    //         formattedData.push({
    //         Water: foundData.totalWater,
    //         date: format(parseDate(foundData.date), 'dd'),
    //         });
    //     } else {
    //         formattedData.push({
    //         Water: 0,
    //         date: date.split('.')[0],
    //         });
    //     }
    //     });

    //     return formattedData;
    // }

// --------------------------------------
    const gradientId = 'waterGradient';

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
        return (
            <div className={css.customTooltip}>
            <p className={css.water}>{`${
                payload[0].value * 1000
            } ml`}</p>
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

    // ======================================
    const test = [
        { Water: 1.2, date: '24' },
        { Water: 2, date: '25' },
        { Water: 1, date: '26' },
        { Water: 2.5, date: '27' },
        { Water: 1.7, date: '28' },
        { Water: 1.1, date: '29' },
        { Water: 2, date: '30' }
    ]

    return (
        <div className={css.statistics}>
            <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={test}>
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
    )
}

export default Statistic;

    // // ------- моя логіка --------

    // const xxx = (data) => {
    //     // створюю масив днів відносно дати
    //     const arrayDates = [];
    //     for (let i = 6; i >= 0; i--) {
    //         arrayDates.push(format(subDays(currentDay, i), 'dd.MM.yyyy'));
    //     }

    //     const newData = [];
    //     arrayDates.forEach(date => {
    //         const findData = data.find(el => format(el.date, 'dd.MM.yyyy') === date);
    //         if (findData) {
    //             newData.push({
    //                 Water: findData.volume,
    //                 date: format(parseDate(findData.date), 'dd'),
    //             });
    //         } else {
    //             newData.push({
    //                 Water: 0,
    //                 date: date.split('.')[0],
    //             });
    //         }
    //     });

    //     return newData;

    // }

    // // console.log(xxx(data));


    // // ------- моя логіка --------

    // // const newData = data.map(el => {
    // //     return { date: format(el.date, 'dd.MM.yyyy') };
    // // });
    // // console.log(newData);

    // const filteredData = data.filter(el => {
    // const dataDate = parseDate(el.date);
    // return isAfter(dataDate, subDays(currentDay, daysRange - 1));
    // });

    // const formattedChartData = formatDataForChart(filteredData);

    // function formatDataForChart(data) {
    //     const formattedData = [];

    //     const possibleDates = [];
    //     for (let i = daysRange - 1; i >= 0; i--) {
    //     possibleDates.push(format(subDays(currentDay, i), 'dd.MM.yyyy'));
    //     }

    //     // const possibleDatesX = possibleDates.map((date) => {
    //     //     return { day: getDate(parseDate(date)), parseDate: parseDate(date).toISOString() };
    //     // });

    //     // const possibleDatesX = possibleDates.map((date) => parseDate(date).toISOString());

    //     // console.log(possibleDatesX);
        
    //     possibleDates.forEach(date => {
    //     const foundData = data.find(el => el.date === date);
    //     if (foundData) {
    //         formattedData.push({
    //         Water: foundData.totalWater,
    //         date: format(parseDate(foundData.date), 'dd'),
    //         });
    //     } else {
    //         formattedData.push({
    //         Water: 0,
    //         date: date.split('.')[0],
    //         });
    //     }
    //     });

    //     return formattedData;
    // }

    // const allDates = [...new Set(data.map(el => el.date.split('.')[0]))];

    // const filledData = allDates.map(date => {
    //     const existingData = data.find(el => el.date === date);
    //     return {
    //     date,
    //     Water: existingData ? existingData.totalWater : 0,
    //     };
    // });

    // filledData.sort((a, b) => {
    //     const dateA = parseDate(a.date);
    //     const dateB = parseDate(b.date);
    //     return dateA - dateB;
    // });

    // function parseDate(dateString) {
    //     const parts = dateString.split('.');
    //     const day = parts[0];
    //     const month = parts[1];
    //     const year = parts[2];
    //     return new Date(`${year}-${month}-${day}`);
    // }