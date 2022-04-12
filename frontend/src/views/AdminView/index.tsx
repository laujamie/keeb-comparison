import React from 'react';
import clsx from 'clsx';
import { Grid, Typography, Button, CircularProgress } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { useQueryClient } from 'react-query';
import {
  usePendingSwitches,
  usePostApproveSwitch,
  useDeleteSwitch,
} from '../../queries/switchQueries';
import SwitchCard from '../../components/SwitchCard';
import Seo from '../../components/Seo';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    switchCard: {
      marginTop: theme.spacing(2),
    },
    header: {
      marginBottom: theme.spacing(1),
    },
  })
);

const AdminView = () => {
  const {
    isLoading: isSwitchesLoading,
    isError: isSwitchesError,
    data: switches,
  } = usePendingSwitches();
  const queryClient = useQueryClient();
  const { mutate: approveSwitch, isLoading: isPosting } =
    usePostApproveSwitch(queryClient);
  const { mutate: deleteSwitch, isLoading: isDeleting } =
    useDeleteSwitch(queryClient);
  const classes = useStyles();

  if (isSwitchesLoading || !switches) {
    return <Skeleton height={450} />;
  }

  if (isSwitchesError) {
    return <Typography>An error occurred</Typography>;
  }

  const approveButton = (id: string | number) => (
    <Grid container spacing={1}>
      <Grid item>
        <Button
          onClick={() => approveSwitch(id)}
          variant="contained"
          color="primary"
          size="small"
          disabled={isPosting}
        >
          {isPosting && <CircularProgress />} Approve
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => deleteSwitch(id)}
          disabled={isDeleting}
        >
          {isDeleting && <CircularProgress />} Delete
        </Button>
      </Grid>
    </Grid>
  );

  return (
    <div>
      <Seo title="Admin Dashboard" />
      <Typography component="h1" variant="h4" className={classes.header}>
        Admin Dashboard
      </Typography>
      {switches.map((switchObj, idx) => (
        <SwitchCard
          key={`pending-switch-${switchObj.id}`}
          switchObj={switchObj}
          className={clsx(idx > 0 && classes.switchCard)}
          cardActions={approveButton(switchObj.id)}
        />
      ))}
    </div>
  );
};

export default AdminView;
