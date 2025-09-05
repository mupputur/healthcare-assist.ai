import React from 'react';
import Sidebar from '../Components/Sidebar';
import styles from './MainLayout.module.css';

const MainLayout = ({ children }) => {
  return (
    <div className={styles.layoutWrapper}>
      {/* Sidebar/Navigation at the top */}
      <div className={styles.topNav}>
        <Sidebar />
      </div>

      {/* Full width content below */}
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
