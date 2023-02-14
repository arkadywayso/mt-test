import React, { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IUser } from '../../core/interfaces/user.interface';
import { UsersApi } from '../../core/api/users-api';
import { AxiosError, AxiosResponse } from 'axios';
// import styles from '../add-user/add-user.module.css';
import { UserForm } from '../../components/user-form/user-form';
import { Button } from '@mui/material';
import styles from './edit-user.module.css';

export const EditUser: FC = (): JSX.Element => {
  const navigate = useNavigate();

  const [user, setUser] = useState<IUser>({ address: { street: '', city: '' }, name: '' });
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    console.log(location);
    void UsersApi.getUser(1)
      .then((response: AxiosResponse<IUser>) => {
        setUser(response.data);
      })
      .catch((error: AxiosError) => {
        throw new Error(error.message);
      });
  }, [setUser]);

  const editUser = (): void => {
    void UsersApi.editUser(1, user)
      .then((response: AxiosResponse<unknown>) => {
        console.log(response);
        navigate('/');
      })
      .catch((error: AxiosError) => {
        navigate('/');
        throw new Error(error.message);
      });
  };

  return (
    <>
      <h1>Редактирование пользователя</h1>
      <div className={styles.formContainer}>
        <UserForm setUser={setUser} setDisabled={setDisabled} user={user} />
      </div>

      <div className={styles.buttonContainer}>
        <Button className={styles.SaveEditButton} variant="contained" disabled={disabled} onClick={editUser}>
          Сохранить
        </Button>
        <Link to={`../${Number(user.id)}/details`}>
          <Button className={styles.backButton} variant="contained">
            Назад
          </Button>
        </Link>
      </div>
    </>
  );
};
