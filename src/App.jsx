import { Route, Routes } from 'react-router-dom';
import { lazy, useEffect } from 'react';
import SharedLayout from './SharedLayout';
import { PrivateRoute } from './routs/PrivateRoute';
import RestrictedRoute from './routs/RestrictedRoute';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from './redux/users/operations';
import { useAuth } from './hooks/useAuth';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const SignIn = lazy(() => import('./pages/SignIn/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp/SignUp'));
const Tracker = lazy(() => import('./pages/Tracker/Tracker'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

const App = () => {
  const dispatch = useDispatch();
  const { isCurrent } = useAuth();

  console.log('isCurrent', isCurrent);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  return (
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
            <RestrictedRoute redirectTo="/tracker" component={<SignIn />} />
          }
        />
        <Route
          path="/signup"
          element={
            <RestrictedRoute redirectTo="/tracker" component={<SignUp />} />
          }
        />

        <Route
          path="/tracker"
          element={
            <PrivateRoute redirectTo="/signin" component={<Tracker />} />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
export default App;
