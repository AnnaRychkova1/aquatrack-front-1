import { Route, Routes } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { lazy, useEffect } from 'react';
import { lazy } from 'react';
import SharedLayout from './SharedLayout';
// import { PrivateRoute } from './routs/PrivateRoute';
// import RestrictedRoute from './routs/RestrictedRoute';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const SignIn = lazy(() => import('./pages/SignIn/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp/SignUp'));
const Tracker = lazy(() => import('./pages/Tracker/Tracker'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

const App = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  // dispatch(refresh());
  // }, [dispatch]);
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="tracker" element={<Tracker />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      {/* <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />} />
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
            <PrivateRoute redirectTo="/signup" component={<Tracker />} />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route> */}
    </Routes>
  );
};
export default App;
