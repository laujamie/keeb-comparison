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

type SignInInputs = {
  email: string;
  password: string;
};

const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInInputs>();
  const [firebaseError, setFirebaseError] = useState<string>('');

  const onSubmit = async (data: SignInInputs, e: any) => {
    try {
      await auth.signInWithEmailAndPassword(data.email, data.password);
      e.target.reset();
      reset();
      setFirebaseError('');
    } catch (e) {
      setFirebaseError(e.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Card>
        <CardHeader title="Sign In" />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid container item spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    error={errors.email !== undefined}
                    helperText={errors.email && errors.email.message}
                    {...register('email', {
                      required: { value: true, message: 'Email is required.' },
                    })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    error={errors.password !== undefined}
                    helperText={errors.password && errors.password.message}
                    {...register('password', {
                      required: {
                        value: true,
                        message: 'Password is required.',
                      },
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters long.',
                      },
                    })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    <Link component={RouterLink} to="/reset-password">
                      Forgot your password?
                    </Link>
                  </Typography>
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
                    Sign In
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    <Link component={RouterLink} to="signup">
                      Create Account
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

export default SignIn;
