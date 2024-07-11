import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './App.module.css';
import Header from './components/Header/Header';

const SharedLayout = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main className={styles.mainContainer}>
        <Suspense>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default SharedLayout;
