import React from 'react';
import { Typography, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { HeadCell } from '../../types/tables';
import SortTable from '../../components/SortTable';
import Seo from '../../components/Seo';
import { useSwitches, Switch } from '../../queries/switchQueries';

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
  const { isError, isLoading, data: switches } = useSwitches();
  const classes = useStyles();

  if (isError) {
    return (
      <Typography>An error occurred while loading the leaderboard</Typography>
    );
  }

  if (isLoading || !switches) {
    return <Skeleton height={600} />;
  }

  return (
    <Card>
      <CardContent>
        <Seo title="Leaderboard" />
        <Typography variant="h4" component="h1">
          Leaderboard
        </Typography>
      </CardContent>
      <SortTable
        headCells={headCells}
        data={switches.map(
          (newSwitch: Switch): Switch => ({
            name: newSwitch.name,
            type: newSwitch.type,
            elo: Math.round(newSwitch.elo),
            numMatches: newSwitch.numMatches,
          })
        )}
        defaultOrder="elo"
        tableLabel="switch-leaderboard"
        tableCellClassName={classes.tableCell}
      />
    </Card>
  );
};

export default LeaderboardView;
