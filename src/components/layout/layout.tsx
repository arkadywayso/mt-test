import React, { FC } from 'react';
import styles from './layout.module.css';
import { Sidebar } from '../sidebar/sidebar';
import { Outlet } from 'react-router-dom';
import { Header } from '../header/header';

export const Layout: FC = (): JSX.Element => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.container}>
        <Header />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
