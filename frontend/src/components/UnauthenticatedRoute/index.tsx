import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../../state/atoms/userAtoms';

type UnuthenticatedRouteProps = {
  LoadingComponent?: React.ReactNode;
} & RouteProps;

const queryString = (name: string, url = window.location.href) => {
  name = name.replace(/[[]]/g, '\\$&');

  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)', 'i');
  const results = regex.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

const UnauthenticatedRoute: React.FC<UnuthenticatedRouteProps> = ({
  LoadingComponent,
  children,
  ...rest
}) => {
  const { isLoaded, isAuthenticated } = useRecoilValue(userState);
  const redirect = queryString('redirect');
  return (
    <Route {...rest}>
      {!isLoaded && LoadingComponent ? LoadingComponent : <CircularProgress />}
      {isLoaded &&
        (!isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={redirect === '' || redirect === null ? '/' : redirect}
          />
        ))}
    </Route>
  );
};

export default UnauthenticatedRoute;
