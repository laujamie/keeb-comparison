import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../../state/atoms/userAtoms';
import { queryString } from '../../util/urlUtil';

type UnuthenticatedRouteProps = {
  LoadingComponent?: React.ReactNode;
} & RouteProps;

const UnauthenticatedRoute: React.FC<UnuthenticatedRouteProps> = ({
  LoadingComponent,
  children,
  ...rest
}) => {
  const { isLoaded, isAuthenticated } = useRecoilValue(userState);
  const redirect = queryString('redirect');
  return (
    <Route {...rest}>
      {!isLoaded &&
        (LoadingComponent ? LoadingComponent : <CircularProgress />)}
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
