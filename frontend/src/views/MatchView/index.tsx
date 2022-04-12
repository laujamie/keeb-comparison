import React from 'react';
import { Grid, Typography, useMediaQuery, Button } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { useSpring, animated } from 'react-spring';
import { useQueryClient } from 'react-query';
import { getUserProfile } from '../../services/firebaseService';
import { useMatch, usePostMatchResult } from '../../queries/matchQueries';
import { useSwitch } from '../../queries/switchQueries';
import SwitchCard from '../../components/SwitchCard';
import Seo from '../../components/Seo';

const MatchView: React.FC = () => {
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.up('md'));
  const queryClient = useQueryClient();
  const [animatedProps, set] = useSpring(() => ({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 500,
  }));

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

  const onClick = (switchOneWin: boolean) => {
    handleSwitchWin.mutate({ switchOneWin });
    set({ reset: true });
  };

  if (matchError || switchOneError || switchTwoError) {
    return <Typography>An error occurred</Typography>;
  }

  if (
    matchLoading ||
    switchOneLoading ||
    switchTwoLoading ||
    !switchOne ||
    !switchTwo
  ) {
    return <Skeleton height={500} />;
  }

  const switchButton = (switchOneWin: boolean) => (
    <Button size="small" color="primary" onClick={() => onClick(switchOneWin)}>
      Pick Winner
    </Button>
  );

  return (
    <>
      <Seo title="Match" />
      <Grid container direction={matchesMd ? 'row' : 'column'} spacing={3}>
        <Grid item md={6}>
          <animated.div style={animatedProps}>
            <SwitchCard
              switchObj={switchOne}
              cardActions={switchButton(true)}
              useCardActions
              displayElo
            />
          </animated.div>
        </Grid>
        <Grid item md={6}>
          <animated.div style={animatedProps}>
            <SwitchCard
              switchObj={switchTwo}
              cardActions={switchButton(false)}
              useCardActions
              displayElo
            />
          </animated.div>
        </Grid>
      </Grid>
    </>
  );
};

export default MatchView;
