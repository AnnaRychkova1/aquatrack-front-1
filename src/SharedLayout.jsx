import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { AppBar } from "./components/AppBar/AppBar";

const SharedLayout = () => {
  return (
    <div>
      <AppBar />
      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default SharedLayout;
