import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Grid,
  Typography,
  useMediaQuery,
  Button,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { useQueryClient } from 'react-query';
import { getUserProfile } from '../../services/firebaseService';
import { useMatch, usePostMatchResult } from '../../queries/matchQueries';
import { useSwitch } from '../../queries/switchQueries';

const MatchView: React.FC = () => {
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.up('md'));
  const queryClient = useQueryClient();

  const {
    isLoading: matchLoading,
    isError: matchError,
    data: match,
  } = useMatch();
  const {
    isLoading: switchOneLoading,
    isError: switchOneError,
    data: switchOne,
  } = useSwitch(match?.switchOneId);
  const {
    isLoading: switchTwoLoading,
    isError: switchTwoError,
    data: switchTwo,
  } = useSwitch(match?.switchTwoId);
  const handleSwitchWin = usePostMatchResult(
    getUserProfile()?.id,
    match?.id,
    queryClient
  );

  if (
    matchLoading ||
    switchOneLoading ||
    switchTwoLoading ||
    !switchOne ||
    !switchTwo
  ) {
    return <Skeleton height={500} />;
  }

  if (matchError || switchOneError || switchTwoError) {
    return <Typography>An error occurred</Typography>;
  }

  return (
    <Grid container direction={matchesMd ? 'row' : 'column'} spacing={3}>
      <Grid item md={6}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              {switchOne.name}
            </Typography>
            <Typography>{Math.floor(switchOne.elo)}</Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => handleSwitchWin.mutate({ switchOneWin: true })}
            >
              Pick Winner
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item md={6}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              {switchTwo.name}
            </Typography>
            <Typography>{Math.floor(switchTwo.elo)}</Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => handleSwitchWin.mutate({ switchOneWin: false })}
            >
              Pick Winner
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MatchView;
