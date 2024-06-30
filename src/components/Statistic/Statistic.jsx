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
import { format, subDays, isAfter, getDate } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { paginationDate } from '../../redux/date/selectors';

const Statistic = ({ data }) => {
    const { t } = useTranslation();
    // const [daysRange, setDaysRange] = useState(7);
    const daysRange = 7;
    const currentDay = new Date(useSelector(paginationDate));
    

    const filteredData = data.filter(el => {
    const dataDate = parseDate(el.date);
    return isAfter(dataDate, subDays(currentDay, daysRange - 1));
    });

    const formattedChartData = formatDataForChart(filteredData);

    function formatDataForChart(data) {
        const formattedData = [];

        const possibleDates = [];
        for (let i = daysRange - 1; i >= 0; i--) {
        possibleDates.push(format(subDays(currentDay, i), 'dd.MM.yyyy'));
        }

        // for (let i = daysRange - 1; i >= 0; i--) {
        // possibleDates.push(new Date(i));
        // }

        const possibleDatesX = possibleDates.map((date) => {
            return { day: getDate(parseDate(date)), parseDate: parseDate(date).toISOString() };
        });

        console.log(possibleDatesX);
        
        possibleDates.forEach(date => {
        const foundData = data.find(el => el.date === date);
        if (foundData) {
            formattedData.push({
            Water: foundData.totalWater,
            date: format(parseDate(foundData.date), 'dd'),
            });
        } else {
            formattedData.push({
            Water: 0,
            date: date.split('.')[0],
            });
        }
        });

        return formattedData;
    }
    // console.log(formattedChartData);

    const allDates = [...new Set(data.map(el => el.date.split('.')[0]))];

    const filledData = allDates.map(date => {
        const existingData = data.find(el => el.date === date);
        return {
        date,
        Water: existingData ? existingData.totalWater : 0,
        };
    });

    filledData.sort((a, b) => {
        const dateA = parseDate(a.date);
        const dateB = parseDate(b.date);
        return dateA - dateB;
    });

    function parseDate(dateString) {
        const parts = dateString.split('.');
        const day = parts[0];
        const month = parts[1];
        const year = parts[2];
        return new Date(`${year}-${month}-${day}`);
    }
    const gradientId = 'waterGradient';

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
        return (
            <div className={css.customTooltip}>
            <p className={css.water}>{`${
                payload[0].value
            } ${t('ml')}`}</p>
            </div>
        );
        }
        return null;
    };
    const formatYAxis = tickItem => {
        if (tickItem === 0) {
        return '0%';
        }
        // const valueInLiters = tickItem / 1000;
        // return `${valueInLiters}L`;
        return `${tickItem}L`;
    };

    // const [isOpen, setIsOpen] = useState(false);
    // const [selectedOption, setSelectedOption] = useState(
    //     `7 ${t('statistics.days')}`
    // );

    // const toggleDropdown = () => {
    //     setIsOpen(!isOpen);
    // };

    // const selectOption = value => {
    //     setSelectedOption(`${value} days`);
    //     setDaysRange(value);
    //     setIsOpen(false);
    // };


    return (
        <div className={css.statistics}>
            {/* <div className={css.controls}>
                <div className={css.customSelectWrapper}>
                <div className={css.customSelect} onClick={toggleDropdown}>
                    <span>{selectedOption}</span>
                    <div
                    className={`${css.arrow} ${isOpen ? css.arrowOpen : ''}`}
                    ></div>
                </div>
                {isOpen && (
                    <div className={css.customOptions}>
                    <div className={css.customOption} onClick={() => selectOption(7)}>
                        7 {t('statistics.days')}
                    </div>
                    <div
                        className={css.customOption}
                        onClick={() => selectOption(14)}
                    >
                        14 {t('statistics.days')}
                    </div>
                    <div
                        className={css.customOption}
                        onClick={() => selectOption(30)}
                    >
                        30 {t('statistics.days')}
                    </div>
                    </div>
                )}
                </div>
            </div> */}
            <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={formattedChartData}>
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
                    tick={{ fill: 'var(--main-text-color)' }}
                    stroke=""
                />
                <YAxis
                    padding={{ top: 20, bottom: 20 }}
                    tickSize={false}
                    tickLine={false}
                    tick={{ fill: 'var(--main-text-color)' }}
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
                    position={{ y: 10 }}
                />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Statistic;