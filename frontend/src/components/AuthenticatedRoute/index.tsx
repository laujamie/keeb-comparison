import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { Route, Redirect, RouteProps, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../../state/atoms/userAtoms';

type AuthenticatedRouteProps = {
  LoadingComponent?: React.ReactNode;
} & RouteProps;

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({
  LoadingComponent,
  children,
  ...props
}) => {
  const { isLoaded, isAuthenticated } = useRecoilValue(userState);
  const { pathname, search } = useLocation();

  return (
    <Route {...props}>
      {!isLoaded && LoadingComponent ? LoadingComponent : <CircularProgress />}
      {isLoaded &&
        (isAuthenticated ? (
          children
        ) : (
          <Redirect to={`/login?redirect=${pathname}${search}`} />
        ))}
    </Route>
  );
};

export default AuthenticatedRoute;
