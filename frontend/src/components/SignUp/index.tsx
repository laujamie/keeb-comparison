import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Grid,
  Typography,
  Link,
} from '@material-ui/core';
import { auth } from '../../util/firebase';
import { initializeUser } from '../../services/authService';

type SignUpInputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    errors,
    setError,
    reset,
  } = useForm<SignUpInputs>();
  const [firebaseError, setFirebaseError] = useState<string>('');

  const onSubmit = async (data: SignUpInputs, e: any) => {
    try {
      const user = await auth.createUserWithEmailAndPassword(
        data.email,
        data.password
      );
      await initializeUser();
      e.target.reset();
      reset();
      console.log(user);
      setFirebaseError('');
    } catch (e) {
      setFirebaseError(e.message);
    }
  };

  const validateConfirmPassword = (confirmPassword: string) => {
    if (!(confirmPassword === watch('password'))) {
      setError('confirmPassword', {
        type: 'validate',
        message: 'Passwords do not match',
      });
      return false;
    }
    return true;
  };

  return (
    <Container maxWidth="sm">
      <Card>
        <CardHeader title="Sign Up" />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid container item spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="email"
                    name="email"
                    inputRef={register({ required: true })}
                    required
                    label="Email"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="password"
                    name="password"
                    inputRef={register({ required: true })}
                    required
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="confirm-password"
                    name="confirmPassword"
                    inputRef={register({
                      required: true,
                      validate: validateConfirmPassword,
                    })}
                    required
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    helperText={
                      errors.confirmPassword
                        ? errors.confirmPassword.message
                        : ''
                    }
                    fullWidth
                  />
                </Grid>
                {firebaseError && (
                  <Grid item xs={12}>
                    <Typography color="error">{firebaseError}</Typography>
                  </Grid>
                )}
              </Grid>
              <Grid container item spacing={1}>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                  >
                    Sign Up
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    I have an account.{' '}
                    <Link component={RouterLink} to="/login">
                      Log in
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SignUp;
