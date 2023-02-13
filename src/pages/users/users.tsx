import React, { FC, useEffect, useState } from 'react';
import {
  Button,
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
import styles from '../users/users.module.css';
import { Link, useNavigate } from 'react-router-dom';

export const Users: FC = (): JSX.Element => {
  const navigate = useNavigate();

  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(3);

  useEffect(() => {
    if (isLoading) {
      void UsersApi.getUsers({ page, limit }).then((response: AxiosResponse<IUser[]>) => {
        setUsers(response.data);
        setIsLoading(false);
      });
    }
  }, [page, limit, isLoading, UsersApi.getUsers, setUsers, setIsLoading]);

  if (isLoading) {
    return <h1>...loading</h1>;
  }

  const handlePageChange = (event: unknown, value: number): void => {
    setPage(value);
    setIsLoadingFalse();
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setLimit(+event.target.value);
    setIsLoadingFalse();
  };

  const setIsLoadingFalse = (): void => {
    if (!isLoading) {
      setIsLoading(true);
    }
  };

  const onRowClick = (userId: number): void => {
    navigate(`./${userId}/details`);
  };

  return (
    <>
      <div className={styles.buttonContainer}>
        <Link to="./add">
          <Button className={styles.addUser} variant="contained">
            Добавить пользователя
          </Button>
        </Link>
      </div>

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
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={() => {
                  onRowClick(Number(user.id));
                }}
              >
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
    </>
  );
};
