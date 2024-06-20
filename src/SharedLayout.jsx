import { Suspense } from "react";
import { Outlet } from "react-router-dom";

// import Header from "./components/Header/Header";

const SharedLayout = () => {
  return (
    <>
      {/* <Header /> */}
      <main>
        <Suspense>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default SharedLayout;
