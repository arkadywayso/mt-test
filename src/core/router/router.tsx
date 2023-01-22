import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { Root } from '../../components/Root';
import { Login } from '../../pages/login/login';
import { Users } from '../../pages/users/users';
import { UsersRoutes } from '../../pages/users/users-routes';
import { UserDetails } from '../../pages/user-details/user-details';
import { EditUser } from '../../pages/edit-user/edit-user';
import { Layout } from '../../components/layout/layout';
import { AddUser } from '../../pages/add-user/add-user';

const routes: RouteObject[] = [
  {
    path: '',
    element: <Root />,
    children: [
      { path: 'login', element: <Login /> },
      {
        path: '',
        element: <Layout />,
        children: [
          {
            path: 'users',
            element: <UsersRoutes />,
            children: [
              { path: '', element: <Users /> },
              { path: 'add', element: <AddUser /> },
              { path: ':id/details', element: <UserDetails /> },
              { path: ':id/edit', element: <EditUser /> }
            ]
          }
        ]
      }
    ]
  }
];

export const router = createBrowserRouter(routes);
