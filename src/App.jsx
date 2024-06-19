import { Route, Routes } from "react-router-dom";
import Modal from "react-modal";

import { lazy } from "react";
import SharedLayout from "./SharedLayout";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

Modal.setAppElement("#root");

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        <Route path="signup" element={<h2>Sign up</h2>} />
        <Route path="signin" element={<h2>Sign in</h2>} />
        <Route path="tracker" element={<h2>Tracker</h2>} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
export default App;
