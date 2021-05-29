import React from 'react';
import clsx from 'clsx';
import { Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { useQueryClient } from 'react-query';
import {
  usePendingSwitches,
  usePostApproveSwitch,
} from '../../queries/switchQueries';
import SwitchCard from '../../components/SwitchCard';

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
  const { mutate: approveSwitch } = usePostApproveSwitch(queryClient);
  const classes = useStyles();

  if (isSwitchesLoading || !switches) {
    return <Skeleton height={450} />;
  }

  if (isSwitchesError) {
    return <Typography>An error occurred</Typography>;
  }

  return (
    <div>
      <Typography component="h1" variant="h4" className={classes.header}>
        Admin Dashboard
      </Typography>
      {switches.map((switchObj, idx) => (
        <SwitchCard
          key={`pending-switch-${switchObj.id}`}
          switchObj={switchObj}
          approveSwitch={() => approveSwitch(switchObj.id)}
          className={clsx(idx > 0 && classes.switchCard)}
        />
      ))}
    </div>
  );
};

/*
<Card key={`pending-switch-${switchObj.id}`}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {switchObj.name}
            </Typography>
            <Typography>{switchObj.type}</Typography>
            <Typography>{switchObj.description}</Typography>
            <Button
              onClick={() => approveSwitch(switchObj.id)}
              color="primary"
              variant="contained"
            >
              Approve
            </Button>
          </CardContent>
        </Card>
*/

export default AdminView;
