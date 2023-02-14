import React, { ChangeEvent, FC, useEffect } from 'react';
import { IUser } from '../../core/interfaces/user.interface';
import { TextField } from '@mui/material';

interface IUserFormProps {
  user: IUser;
  setUser?: (user: (prevState: IUser) => IUser) => void;
  setDisabled?: (state: boolean) => void;
  readonly?: boolean;
}

export const UserForm: FC<IUserFormProps> = ({ setUser, setDisabled, user, readonly }): JSX.Element => {
  useEffect(() => {
    if (user.name.length > 2 && user.address.city.length > 2 && user.address.street.length > 2) {
      if (setDisabled != null) {
        setDisabled(false);
      }
    } else {
      if (setDisabled != null) {
        setDisabled(true);
      }
    }
  }, [user.name, user.address.city, user.address.street, setDisabled]);

  const setUserName = (event: ChangeEvent<HTMLInputElement>): void => {
    if (setUser != null) {
      setUser((prevState: IUser) => {
        return {
          ...prevState,
          name: event.target.value
        };
      });
    }
  };
  const setUserCity = (event: ChangeEvent<HTMLInputElement>): void => {
    if (setUser != null) {
      setUser((prevState: IUser) => {
        return {
          ...prevState,
          address: {
            ...prevState.address,
            city: event.target.value
          }
        };
      });
    }
  };
  const setUserStreet = (event: ChangeEvent<HTMLInputElement>): void => {
    if (setUser != null) {
      setUser((prevState: IUser) => {
        return {
          ...prevState,
          address: {
            ...prevState.address,
            street: event.target.value
          }
        };
      });
    }
  };

  return (
    <>
      <TextField
        size="small"
        label="ФИО"
        variant="outlined"
        value={user.name}
        onChange={setUserName}
        disabled={readonly}
      />
      <TextField
        size="small"
        label="Город"
        variant="outlined"
        value={user.address.city}
        onChange={setUserCity}
        disabled={readonly}
      />
      <TextField
        size="small"
        label="Улица"
        variant="outlined"
        value={user.address.street}
        onChange={setUserStreet}
        disabled={readonly}
      />
    </>
  );
};
