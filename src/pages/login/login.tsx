import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Button, Paper, TextField } from '@mui/material';
import styles from './login.module.css';
import { IUserCredentials } from '../../core/interfaces/user-credentials.interface';
import { AuthApi } from '../../core/api/auth-api';
import { AxiosResponse } from 'axios';
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

  const submit = (): void => {
    void AuthApi.login(userCredentials)
      .then((response: AxiosResponse<unknown>) => {
        console.log(response);
        navigate('/');
      })
      .catch((response: AxiosResponse<unknown>) => {
        console.log(response);
        navigate('/');
      });
  };

  return (
    <Paper elevation={3} className={styles.paper}>
      <h1>Вход</h1>
      <TextField id="outlined-basic" size="small" label="Логин" variant="outlined" onChange={setLogin} />
      <TextField
        id="outlined-basic"
        size="small"
        type="password"
        label="Пароль"
        variant="outlined"
        onChange={setPassword}
      />
      <Button variant="contained" disabled={disabled} onClick={submit}>
        Войти
      </Button>
    </Paper>
  );
};
