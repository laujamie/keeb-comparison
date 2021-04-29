import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import { Route, Redirect, RouteProps, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../../state/atoms/userAtoms';
import { getIdTokenResult } from '../../services/firebaseService';

type AuthenticatedRouteProps = {
  LoadingComponent?: React.ReactNode;
  adminOnly?: boolean;
} & RouteProps;

type AdminState = {
  isLoaded: boolean;
  isAdmin: boolean;
};

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({
  LoadingComponent,
  children,
  adminOnly,
  ...props
}) => {
  const [adminState, setAdminState] = useState<AdminState>({
    isLoaded: false,
    isAdmin: false,
  });
  const { isLoaded, isAuthenticated } = useRecoilValue(userState);
  const { pathname, search } = useLocation();

  useEffect(() => {
    async function loadAdminState() {
      const result = await getIdTokenResult();
      if (!result) {
        setAdminState({ isLoaded: true, isAdmin: false });
      } else if (result.claims.role === 'admin') {
        setAdminState({ isLoaded: true, isAdmin: true });
      } else {
        setAdminState({ isLoaded: true, isAdmin: false });
      }
    }
    loadAdminState();
  }, []);

  const renderRedirect = () => (
    <Redirect to={`/login?redirect=${pathname}${search}`} />
  );

  return (
    <Route {...props}>
      {!isLoaded && (LoadingComponent || <CircularProgress />)}
      {adminOnly &&
        isLoaded &&
        adminState.isLoaded &&
        !adminState.isAdmin &&
        renderRedirect()}
      {isLoaded && (isAuthenticated ? children : renderRedirect())}
    </Route>
  );
};

export default AuthenticatedRoute;
