import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
} from '@material-ui/core';
import { auth } from '../../util/firebase';

type PasswordResetInputs = {
  email: string;
};

const PasswordReset: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<PasswordResetInputs>();
  const [firebaseError, setFirebaseError] = useState<string>('');

  const onSubmit = async (data: PasswordResetInputs, e: any) => {
    try {
      await auth.sendPasswordResetEmail(data.email);
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
        <CardHeader title="Reset Password" />
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
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PasswordReset;
