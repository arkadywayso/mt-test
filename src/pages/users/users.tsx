import { FC, useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { IUser } from '../../core/interfaces/user.interface';
import { UsersApi } from '../../core/api/users-api';
import { AxiosResponse } from 'axios';

export const Users: FC = (): JSX.Element => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isLoading) {
      void UsersApi.getUsers().then((response: AxiosResponse<IUser[]>) => {
        setUsers(response.data);
        setIsLoading(false);
      });
    }
  }, [isLoading]);

  if (isLoading) {
    return <h1>...loading</h1>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="users">
        <TableHead>
          <TableRow>
            <TableCell align="left">Идентифекатор пользователя</TableCell>
            <TableCell align="right">Имя пользователя</TableCell>
            <TableCell align="right">Город</TableCell>
            <TableCell align="right">Улица</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user: IUser) => (
            <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {user.id}
              </TableCell>
              <TableCell align="right">{user.name}</TableCell>
              <TableCell align="right">{user.address.city}</TableCell>
              <TableCell align="right">{user.address.street}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
