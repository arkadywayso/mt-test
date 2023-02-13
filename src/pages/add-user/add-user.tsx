import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { IUser } from '../../core/interfaces/user.interface';
import { Button, TextField } from '@mui/material';
import { AxiosError, AxiosResponse } from 'axios';
import { UsersApi } from '../../core/api/users-api';
import { useNavigate } from 'react-router-dom';
import styles from './add-user.module.css';

export const AddUser: FC = (): JSX.Element => {
  const navigate = useNavigate();

  const [user, setUser] = useState<IUser>({ address: { street: '', city: '' }, name: '' });
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (user.name.length > 2 && user.address.city.length > 2 && user.address.street.length > 2) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user.name, user.address.city, user.address.street, setDisabled]);

  const setUserName = (event: ChangeEvent<HTMLInputElement>): void => {
    setUser((prevState: IUser) => {
      return {
        ...prevState,
        name: event.target.value
      };
    });
  };
  const setUserCity = (event: ChangeEvent<HTMLInputElement>): void => {
    setUser((prevState: IUser) => {
      return {
        ...prevState,
        address: {
          ...prevState.address,
          city: event.target.value
        }
      };
    });
  };
  const setUserStreet = (event: ChangeEvent<HTMLInputElement>): void => {
    setUser((prevState: IUser) => {
      return {
        ...prevState,
        address: {
          ...prevState.address,
          street: event.target.value
        }
      };
    });
  };

  const addUser = (): void => {
    void UsersApi.addUser(user)
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
    <>
      <h1>Добавление пользователя</h1>
      <div className={styles.formContainer}>
        <TextField
          id="outlined-basic"
          size="small"
          label="ФИО"
          variant="outlined"
          value={user.name}
          onChange={setUserName}
        />
        <TextField
          id="outlined-basic"
          size="small"
          label="Город"
          variant="outlined"
          value={user.address.city}
          onChange={setUserCity}
        />
        <TextField
          id="outlined-basic"
          size="small"
          label="Улица"
          variant="outlined"
          value={user.address.street}
          onChange={setUserStreet}
        />
      </div>

      <Button variant="contained" disabled={disabled} onClick={addUser}>
        Добавить
      </Button>
    </>
  );
};
