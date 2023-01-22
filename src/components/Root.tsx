import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const Root: FC = (): JSX.Element => {
  return <Outlet />;
};
