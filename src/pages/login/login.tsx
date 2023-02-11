import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Button, Paper, TextField } from '@mui/material';
import styles from './login.module.css';
import { IUserCredentials } from '../../core/interfaces/user-credentials.interface';
import { AuthApi } from '../../core/api/auth-api';
import { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

export const Login: FC = (): JSX.Element => {
  const navigate = useNavigate();

  const [userCredentials, setUserCredentials] = useState<IUserCredentials>({ login: '', password: '' });
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (userCredentials.password.length > 3 && userCredentials.login.length > 3) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [userCredentials, setDisabled]);

  const setLogin = (event: ChangeEvent<HTMLInputElement>): void => {
    setUserCredentials((credentials: IUserCredentials) => {
      return {
        ...credentials,
        login: event.target.value
      };
    });
  };

  const setPassword = (event: ChangeEvent<HTMLInputElement>): void => {
    setUserCredentials((credentials: IUserCredentials) => {
      return {
        ...credentials,
        password: event.target.value
      };
    });
  };

  const login = (): void => {
    void AuthApi.login(userCredentials)
      .then((response: AxiosResponse<unknown>) => {
        console.log(response);
        localStorage.setItem('accessToken', 'tokenValue');
        navigate('/');
      })
      .catch((error: AxiosError) => {
        localStorage.setItem('accessToken', 'tokenValue');
        navigate('/');
        throw new Error(error.message);
      });
  };

  return (
    <Paper elevation={3} className={styles.paper}>
      <h1>Вход</h1>
      <TextField size="small" label="Логин" variant="outlined" onChange={setLogin} />
      <TextField size="small" type="password" label="Пароль" variant="outlined" onChange={setPassword} />
      <Button variant="contained" disabled={disabled} onClick={login}>
        Войти
      </Button>
    </Paper>
  );
};
