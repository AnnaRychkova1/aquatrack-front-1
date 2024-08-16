import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import css from './CountPeople.module.css';
import Loader from '../../shared/components/Loader/Loader';
import { countUsers } from '../../redux/users/operations';
import { selectCount, selectIsLoading } from '../../redux/users/selectors';

const CountPeople = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const userCount = useSelector(selectCount);

  const formatUserCount = userCount => {
    if (userCount !== null) {
      if (userCount > 10000) {
        return `${(userCount / 1000).toFixed(2)}k`;
      } else {
        return userCount.toString();
      }
    }
    return '';
  };

  const formattedUserCount = formatUserCount(userCount);

  useEffect(() => {
    dispatch(countUsers());
  }, [dispatch]);

  if (isLoading) return <Loader />;

  return (
    <div className={`${css.count_Users} ${css.desktopOnly}${css.countplus}`}>
      <p className={css.count_Text}>
        {t('adwantagesSection.count.our')}{' '}
        <span className={css.textSpan}>
          {t('adwantagesSection.count.team')}{' '}
        </span>{' '}
        {t('adwantagesSection.count.now')} : {formattedUserCount}
      </p>
    </div>
  );
};

export default CountPeople;
