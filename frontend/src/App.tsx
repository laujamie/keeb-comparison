import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import PasswordReset from './components/PasswordReset';
import { auth } from './util/firebase';
import { userState } from './state/atoms/userAtoms';

function App() {
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged((newUser) => {
      if (newUser !== null) {
        setUser(true);
      } else {
        setUser(false);
      }
    });
    return () => unregisterAuthObserver();
  }, [setUser]);

  return (
    <Router>
      <CssBaseline />
      <SignIn />
      <SignUp />
      <PasswordReset />
    </Router>
  );
}

export default App;
