import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { getUserProfile } from '../../services/firebaseService';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardContainer: {
      height: '100%',
    },
  })
);

const ProfileView = () => {
  const profile = getUserProfile();
  const classes = useStyles();

  if (profile == null) {
    return (
      <Typography>
        You need to be logged in to get the current profile.
      </Typography>
    );
  }

  return (
    <Card className={classes.cardContainer}>
      <CardContent>
        <Typography variant="h4" component="h1">
          Profile
        </Typography>
        <Typography>Email: {profile.email}</Typography>
      </CardContent>
    </Card>
  );
};

export default ProfileView;
