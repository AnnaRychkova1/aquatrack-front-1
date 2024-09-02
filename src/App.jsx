import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { lazy, useEffect } from 'react';

import SharedLayout from './SharedLayout';
import Loader from './shared/components/Loader/Loader';
import Header from './components/Header/Header';
import { PrivateRoute } from './routs/PrivateRoute';
import { RestrictedRoute } from './routs/RestrictedRoute';
import { currentUser } from './redux/users/operations';
import { selectToken } from './redux/users/selectors';
import { useAuth } from './hooks/useAuth';
import UniversalModal from './modals/Modal/Modal';

const HomePage = lazy(() => import('./pages/HomePage'));
const SignInPage = lazy(() => import('./pages/SignInPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const Tracker = lazy(() => import('./pages/Tracker'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));
const RenewPasswordPage = lazy(() => import('./pages/RenewPasswordPage'));
const ForgotPage = lazy(() => import('./pages/ForgotPage'));

const App = () => {
  const dispatch = useDispatch();
  const { isCurrent } = useAuth();
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token) {
      dispatch(currentUser());
    }
  }, [dispatch, token]);

  return isCurrent ? (
    <Loader />
  ) : (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route
            index
            element={
              <RestrictedRoute redirectTo="/tracker" component={<HomePage />} />
            }
          />
          <Route
            path="/signin"
            element={
              <RestrictedRoute
                redirectTo="/tracker"
                component={<SignInPage />}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <RestrictedRoute
                redirectTo="/tracker"
                component={<SignUpPage />}
              />
            }
          />
          <Route
            path="/forgot"
            element={
              <RestrictedRoute redirectTo="/" component={<ForgotPage />} />
            }
          />
          <Route
            path="/renew"
            element={
              <RestrictedRoute
                redirectTo="/signin"
                component={<RenewPasswordPage />}
              />
            }
          />
          <Route
            path="/tracker"
            element={<PrivateRoute redirectTo="/" component={<Tracker />} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <UniversalModal />
    </>
  );
};
export default App;
