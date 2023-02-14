import React, { FC, useEffect, useState } from 'react';
import styles from '../user-details/user-details.module.css';
import { UserForm } from '../../components/user-form/user-form';
import { Button } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { IUser } from '../../core/interfaces/user.interface';
import { UsersApi } from '../../core/api/users-api';
import { AxiosError, AxiosResponse } from 'axios';

export const UserDetails: FC = (): JSX.Element => {
  const { userId } = useParams();
  const [user, setUser] = useState<IUser>({ address: { street: '', city: '' }, name: '' });

  useEffect(() => {
    console.log(userId);
    void UsersApi.getUser(1)
      .then((response: AxiosResponse<IUser>) => {
        setUser(response.data);
      })
      .catch((error: AxiosError) => {
        throw new Error(error.message);
      });
  }, [setUser]);

  return (
    <>
      <div className={styles.buttonContainer}>
        <h1>Детали пользователя</h1>
        <Link to={`../${Number(user.id)}/edit`}>
          <Button className={styles.editUserButton} variant="contained">
            Редактировать пользователя
          </Button>
        </Link>
      </div>
      <div className={styles.formContainer}>
        <UserForm user={user} readonly={true} />
      </div>

      <Link to="/users">
        <Button className={styles.backButton} variant="contained">
          Назад
        </Button>
      </Link>
    </>
  );
};
