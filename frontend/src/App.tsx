import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CssBaseline, Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HomeView from './views/HomeView';
import SignInView from './views/SignInView';
import SignUpView from './views/SignUpView';
import PasswordResetView from './views/PasswordResetView';
import LeaderboardView from './views/LeaderboardView';
import MatchView from './views/MatchView';
import NewSwitchView from './views/NewSwitchView';
import AdminView from './views/AdminView';
import ProfileView from './views/ProfileView';
import { auth } from './util/firebase';
import { userState } from './state/atoms/userAtoms';
import AppBar from './components/AppBar';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';

const useStyles = makeStyles({
  container: {
    height: '100%',
  },
  bodyContainer: {
    paddingTop: '1rem',
    paddingBottom: '1rem',
  },
});

const App = () => {
  const setUser = useSetRecoilState(userState);
  const classes = useStyles();

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged((newUser) => {
      if (newUser !== null) {
        newUser.getIdTokenResult(true).then((idTokenResult) => {
          setUser({
            isLoaded: true,
            isAuthenticated: true,
            isAdmin: idTokenResult.claims.role === 'admin',
          });
        });
      } else {
        setUser({
          isLoaded: true,
          isAuthenticated: false,
          isAdmin: false,
        });
      }
    });
    return () => unregisterAuthObserver();
  }, [setUser]);

  return (
    <Router>
      <CssBaseline />
      <Grid
        className={classes.container}
        container
        direction="column"
        wrap="nowrap"
      >
        <Grid item>
          <AppBar />
        </Grid>
        <Grid item xs={true}>
          <Container
            maxWidth="lg"
            className={`${classes.container} ${classes.bodyContainer}`}
          >
            <Switch>
              <UnauthenticatedRoute path="/login" exact>
                <SignInView />
              </UnauthenticatedRoute>
              <UnauthenticatedRoute path="/signup" exact>
                <SignUpView />
              </UnauthenticatedRoute>
              <UnauthenticatedRoute path="/reset-password" exact>
                <PasswordResetView />
              </UnauthenticatedRoute>
              <Route path="/leaderboard" exact>
                <LeaderboardView />
              </Route>
              <AuthenticatedRoute path="/switches/new" exact>
                <NewSwitchView />
              </AuthenticatedRoute>
              <AuthenticatedRoute path="/match" exact>
                <MatchView />
              </AuthenticatedRoute>
              <AuthenticatedRoute path="/admin" exact adminOnly>
                <AdminView />
              </AuthenticatedRoute>
              <AuthenticatedRoute path="/profile" exact>
                <ProfileView />
              </AuthenticatedRoute>
              <Route path="/" exact>
                <HomeView />
              </Route>
            </Switch>
          </Container>
        </Grid>
      </Grid>
    </Router>
  );
};

export default App;
