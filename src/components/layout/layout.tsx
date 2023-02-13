import React, { FC, useEffect } from 'react';
import styles from './layout.module.css';
import { Sidebar } from '../sidebar/sidebar';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../header/header';
import { CardContent } from '@mui/material';

export const Layout: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('users');
    }
  }, [location.pathname]);

  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.container}>
        <Header />
        <div className={styles.content}>
          <CardContent>
            <Outlet />
          </CardContent>
        </div>
      </div>
    </div>
  );
};
