import { Route, Routes } from "react-router-dom";

import { lazy } from "react";
import SharedLayout from "./SharedLayout";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const SignIn = lazy(() => import("./pages/SignIn/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp/SignUp"));
const Tracker = lazy(() => import("./pages/Tracker/Tracker"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="tracker" element={<Tracker />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
export default App;
