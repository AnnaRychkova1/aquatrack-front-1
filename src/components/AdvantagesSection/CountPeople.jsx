import React, { useEffect, useState } from 'react';

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
        setUserCount(data.count);
      } catch (error) {
        setError(error);
        console.error('Error fetching user count:', error); // Додайте цей рядок для виведення додаткової інформації про помилку в консоль
      } finally {
        setLoading(false);
      }
    };

    fetchUserCount();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>; // Виведення самої помилки

  return (
    <div>
      <h1>Number of Users: {userCount}</h1>
    </div>
  );
};

export default UserCount;
