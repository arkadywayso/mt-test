import React, { FC, useEffect, useState } from 'react';
import {
  CardContent,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import { IUser } from '../../core/interfaces/user.interface';
import { UsersApi } from '../../core/api/users-api';
import { AxiosResponse } from 'axios';
import Button from '@mui/material/Button';
import styles from '../users/users.module.css';

export const Users: FC = (): JSX.Element => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(3);

  const fetchUsers = (): void => {
    void UsersApi.getUsers({ page, limit }).then((response: AxiosResponse<IUser[]>) => {
      setUsers(response.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (isLoading) {
      fetchUsers();
    }
  }, [page, limit, isLoading]);

  if (isLoading) {
    return <h1>...loading</h1>;
  }

  const handlePageChange = (event: unknown, value: number): void => {
    setPage(value);
    if (!isLoading) {
      setIsLoading(true);
    }
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setLimit(+event.target.value);
    if (!isLoading) {
      setIsLoading(true);
    }
  };

  return (
    <>
      <Button className={styles.addUser} variant="contained">
        Добавить пользователя
      </Button>
      <CardContent>
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
        <Stack spacing={2}>
          <TablePagination
            rowsPerPageOptions={[3, 5, 10]}
            component="div"
            count={10} // API limitation
            rowsPerPage={limit}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Stack>
      </CardContent>
    </>
  );
};
