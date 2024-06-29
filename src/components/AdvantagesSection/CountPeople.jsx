import React, { useEffect, useState } from 'react';
import css from './CountPeople.module.css';

const UserCount = () => {
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className={css.count_users}>
      <h4>Our team: {userCount} people </h4>
    </div>
  );
};

export default UserCount;
