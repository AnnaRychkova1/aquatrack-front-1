import { useEffect, useState } from 'react';
import css from './CountPeople.module.css';
import { useTranslation } from 'react-i18next';
import Loader from '../Loader/Loader';

const UserCount = () => {
  const { t } = useTranslation();
  const [userCount, setUserCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await fetch(
          'https://aquatrack-back-1.onrender.com/api/users/count'
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUserCount(data.userCount);
      } catch (error) {
        setError(error);
        console.error('Error fetching user count:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCount();
  }, []);

  const formatUserCount = count => {
    if (count > 10000) {
      return `${(count / 1000).toFixed(2)} `;
    } else {
      return count.toString();
    }
  };

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={`${css.count_Users} ${css.desktopOnly}${css.countplus}`}>
      <p className={css.count_Text}>
        {t('adwantagesSection.count.our')}{' '}
        <span className={css.textSpan}>
          {t('adwantagesSection.count.team')}{' '}
        </span>{' '}
        {t('adwantagesSection.count.now')} : {formatUserCount(userCount)}
      </p>
    </div>
  );
};

export default UserCount;
