import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { apiClient } from '../../services/apiService';
import { HeadCell } from '../../types/tables';
import SortTable from '../../components/SortTable';

interface Switch {
  name: string;
  type: string;
  elo: number;
  numMatches: number;
  [name: string]: string | number;
}

interface SwitchResponse {
  switches: Switch[];
}

const fetchSwitches = async () => {
  const response = await apiClient.get<SwitchResponse>('/switches');
  return response.data;
};

const useStyles = makeStyles({
  tableCell: {
    textTransform: 'capitalize',
  },
});

const headCells: HeadCell<Switch>[] = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'type', numeric: false, disablePadding: false, label: 'Type' },
  { id: 'elo', numeric: true, disablePadding: false, label: 'Elo' },
  {
    id: 'numMatches',
    numeric: true,
    disablePadding: false,
    label: '# of Matches',
  },
];

const LeaderboardView: React.FC = () => {
  const { isError, isLoading, data } = useQuery('all-switches', fetchSwitches);
  const classes = useStyles();

  useEffect(() => {
    if (!isLoading) console.log(data);
  }, [isLoading, data]);

  if (isLoading || !data) {
    return <Skeleton height={600} />;
  }

  if (isError) {
    return (
      <Typography>An error occurred while loading the leaderboard</Typography>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      <SortTable
        headCells={headCells}
        data={data.switches.map(
          (newSwitch: Switch): Switch => ({
            name: newSwitch.name,
            type: newSwitch.type,
            elo: newSwitch.elo,
            numMatches: newSwitch.numMatches,
          })
        )}
        defaultOrder="elo"
        tableLabel="switch-leaderboard"
        tableCellClassName={classes.tableCell}
      />
    </div>
  );
};

export default LeaderboardView;
