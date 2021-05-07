import React from 'react';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useQueryClient } from 'react-query';
import {
  usePendingSwitches,
  usePostApproveSwitch,
} from '../../queries/switchQueries';

const AdminView = () => {
  const {
    isLoading: isSwitchesLoading,
    isError: isSwitchesError,
    data: switches,
  } = usePendingSwitches();
  const queryClient = useQueryClient();
  const { mutate: approveSwitch } = usePostApproveSwitch(queryClient);

  if (isSwitchesLoading || !switches) {
    return <Skeleton height={450} />;
  }

  if (isSwitchesError) {
    return <Typography>An error occurred</Typography>;
  }

  return (
    <div>
      {switches.map((switchObj) => (
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
      ))}
    </div>
  );
};

export default AdminView;
