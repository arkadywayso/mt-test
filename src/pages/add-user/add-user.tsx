import React, { FC, useState } from 'react';
import { IUser } from '../../core/interfaces/user.interface';
import { Button } from '@mui/material';
import { AxiosError, AxiosResponse } from 'axios';
import { UsersApi } from '../../core/api/users-api';
import { Link, useNavigate } from 'react-router-dom';
import styles from './add-user.module.css';
import { UserForm } from '../../components/user-form/user-form';

export const AddUser: FC = (): JSX.Element => {
  const navigate = useNavigate();

  const [user, setUser] = useState<IUser>({ address: { street: '', city: '' }, name: '' });
  const [disabled, setDisabled] = useState<boolean>(true);

  const addUser = (): void => {
    void UsersApi.addUser(user)
      .then((response: AxiosResponse<unknown>) => {
        console.log(response);
        navigate('users');
      })
      .catch((error: AxiosError) => {
        navigate('users');
        throw new Error(error.message);
      });
  };

  return (
    <>
      <h1>Добавление пользователя</h1>
      <div className={styles.formContainer}>
        <UserForm setUser={setUser} setDisabled={setDisabled} user={user} />
      </div>

      <div className={styles.buttonContainer}>
        <Button className={styles.addUserButton} variant="contained" disabled={disabled} onClick={addUser}>
          Добавить
        </Button>

        <Link to="/users">
          <Button className={styles.backButton} variant="contained">
            Назад
          </Button>
        </Link>
      </div>
    </>
  );
};
