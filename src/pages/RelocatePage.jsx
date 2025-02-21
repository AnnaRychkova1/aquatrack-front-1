import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../shared/components/Loader/Loader';
import { currentUser } from '../redux/users/operations';
import { selectIsLoading, selectUser } from '../redux/users/selectors'; // Додано селектори

const RelocatePage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const token = query.get('token');

  const isLoading = useSelector(selectIsLoading);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (token) {
      console.log(token);
      localStorage.setItem('token', token);
      console.log('go to dispatch');
      dispatch(currentUser());
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (user) {
      navigate('/tracker');
    }
  }, [user, navigate]);

  if (isLoading) {
    return <Loader />;
  }

  return null;
};

export default RelocatePage;
