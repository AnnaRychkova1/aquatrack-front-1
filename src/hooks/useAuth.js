import { useSelector } from 'react-redux';
import {
  selectUser,
  selectIsSignedIn,
  selectCurrentUser,
} from '../redux/users/selectors.js';

export const useAuth = () => {
  const isLoggedIn = useSelector(selectIsSignedIn);
  const isCurrent = useSelector(selectCurrentUser);
  const user = useSelector(selectUser);

  return {
    isLoggedIn,
    isCurrent,
    user,
  };
};
