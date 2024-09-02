import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Loader from '../shared/components/Loader/Loader';
import { currentUser } from '../redux/users/operations';

const RelocatePage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const query = new URLSearchParams(location.search);
  const token = query.get('token');
  console.log('token1', token);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      dispatch(currentUser());
    }
  }, [location, dispatch, token]);

  return (
    <>
      <Loader />
    </>
  );
};

export default RelocatePage;
