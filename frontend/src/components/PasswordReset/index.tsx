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
  Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { auth } from '../../util/firebase';
import { createActionCodeSettings } from '../../services/firebaseService';

type PasswordResetInputs = {
  email: string;
};

const PasswordReset: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordResetInputs>();
  const [firebaseError, setFirebaseError] = useState<string>('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarEmail, setSnackbarEmail] = useState('');

  const onSubmit = async (data: PasswordResetInputs, e: any) => {
    try {
      const config = createActionCodeSettings();
      await auth.sendPasswordResetEmail(data.email, config);
      e.target.reset();
      reset();
      setFirebaseError('');
      setSnackbarOpen(true);
      setSnackbarEmail(data.email);
    } catch (e) {
      setFirebaseError(e.message);
    }
  };

  const handleSnackbarClose = (e?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Card>
        <CardHeader title="Reset Password" />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
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
              {firebaseError && (
                <Grid item xs={12}>
                  <Typography color="error">{firebaseError}</Typography>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                >
                  Reset Password
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <Link component={RouterLink} to="/login">
                    Log In
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          elevation={6}
        >
          A password reset email has been sent to {snackbarEmail}!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PasswordReset;
