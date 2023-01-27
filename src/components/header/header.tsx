import { FC } from 'react';
import styles from './header.module.css';
import Button from '@mui/material/Button';
import { AuthApi } from '../../core/api/auth-api';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

export const Header: FC = (): JSX.Element => {
  const navigate = useNavigate();

  const logOut = (): void => {
    void AuthApi.logOut()
      .then(() => {
        localStorage.removeItem('accessToken');
        navigate('/login');
      })
      .catch((error: AxiosError) => {
        localStorage.removeItem('accessToken');
        navigate('/login');
        throw new Error(error.message);
      });
  };

  return (
    <header className={styles.header}>
      <Button className={styles.button} variant="contained" onClick={logOut}>
        Выйти
      </Button>
    </header>
  );
};
