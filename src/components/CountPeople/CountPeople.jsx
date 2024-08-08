import { useEffect } from 'react';
import css from './CountPeople.module.css';
import { useTranslation } from 'react-i18next';
import Loader from '../../shared/components/Loader/Loader';
import { countUsers } from '../../redux/users/operations';
import { useDispatch, useSelector } from 'react-redux';
import { selectCount, selectIsLoading } from '../../redux/users/selectors';

const CountPeople = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const userCount = useSelector(selectCount);
  console.log(userCount);

  useEffect(() => {
    dispatch(countUsers());
  }, [dispatch]);

  // const formatUserCount = count => {
  //   if (count === null) {
  //     if (count > 10000) {
  //       return `${(count / 1000).toFixed(2)} `;
  //     } else {
  //       return count.toString();
  //     }
  //   }
  // };

  if (isLoading) return <Loader />;

  return (
    <div className={`${css.count_Users} ${css.desktopOnly}${css.countplus}`}>
      <p className={css.count_Text}>
        {t('adwantagesSection.count.our')}{' '}
        <span className={css.textSpan}>
          {t('adwantagesSection.count.team')}{' '}
        </span>{' '}
        {t('adwantagesSection.count.now')} : {userCount}
      </p>
    </div>
  );
};

export default CountPeople;
