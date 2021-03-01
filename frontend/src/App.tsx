import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CssBaseline, Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SignInView from './views/SignInView';
import SignUpView from './views/SignUpView';
import PasswordResetView from './views/PasswordResetView';
import { auth } from './util/firebase';
import { userState } from './state/atoms/userAtoms';
import AppBar from './components/AppBar';

const useStyles = makeStyles({
  container: {
    height: '100%',
  },
});

const App = () => {
  const setUser = useSetRecoilState(userState);
  const classes = useStyles();

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged((newUser) => {
      if (newUser !== null) {
        setUser({
          isLoaded: true,
          isAuthenticated: true,
        });
      } else {
        setUser({
          isLoaded: true,
          isAuthenticated: false,
        });
      }
    });
    return () => unregisterAuthObserver();
  }, [setUser]);

  return (
    <Router>
      <CssBaseline />
      <Grid className={classes.container} container direction="column">
        <Grid item>
          <AppBar />
        </Grid>
        <Grid item xs={true}>
          <Container maxWidth="lg" className={classes.container}>
            <Switch>
              <Route path="/login" exact>
                <SignInView />
              </Route>
              <Route path="/signup" exact>
                <SignUpView />
              </Route>
              <Route path="/reset-password" exact>
                <PasswordResetView />
              </Route>
              <Route path="/" exact>
                <div>
                  <p>Lmao</p>
                </div>
              </Route>
            </Switch>
          </Container>
        </Grid>
      </Grid>
    </Router>
  );
};

export default App;
