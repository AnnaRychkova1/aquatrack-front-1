import { useSelector } from 'react-redux';
import {
  selectUser,
  selectIsSignedIn,
  // selectIsRefreshing,
} from '../redux/users/selectors.js';

export const useAuth = () => {
  const isLoggedIn = useSelector(selectIsSignedIn);
  // const isRefreshing = useSelector(selectIsRefreshing);
  const user = useSelector(selectUser);

  return {
    isLoggedIn,
    // isRefreshing,
    user,
  };
};
