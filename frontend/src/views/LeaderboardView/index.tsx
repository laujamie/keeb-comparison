import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { apiClient } from '../../services/apiService';

const fetchSwitches = async () => {
  const response = await apiClient.get('/switches');
  return response.data;
};

const useStyles = makeStyles({
  tableCell: {
    textTransform: 'capitalize',
  },
});

const LeaderboardView: React.FC = () => {
  const { isError, isLoading, data } = useQuery('all-switches', fetchSwitches);
  const classes = useStyles();
  useEffect(() => {
    if (!isLoading) console.log(data);
  }, [isLoading, data]);

  if (isLoading) {
    return <Skeleton height={600} />;
  }

  if (isError) {
    return (
      <Typography>An error occurred while loading the leaderboard</Typography>
    );
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Switch Type</TableCell>
          <TableCell>Elo</TableCell>
          <TableCell># of Matches</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.switches.map((switchObj: any) => (
          <TableRow key={`switch-row-${switchObj.id}`}>
            <TableCell className={classes.tableCell}>
              {switchObj.name}
            </TableCell>
            <TableCell className={classes.tableCell}>
              {switchObj.type}
            </TableCell>
            <TableCell className={classes.tableCell}>
              {switchObj.elo.toFixed(1)}
            </TableCell>
            <TableCell className={classes.tableCell}>
              {switchObj.numMatches}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LeaderboardView;
