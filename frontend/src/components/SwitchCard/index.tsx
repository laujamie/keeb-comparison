import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardProps,
  CardActions,
  Grid,
} from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { ArrowBack } from '@material-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { Switch, FullSwitch } from '../../queries/switchQueries';

type SwitchCardProps = CardProps & {
  switchObj: Switch | FullSwitch;
  redirectUrl?: string;
  cardActions?: React.ReactNode | JSX.Element;
  displayElo?: boolean;
  useCardActions?: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typeText: {
      textTransform: 'capitalize',
      marginTop: `-${theme.spacing(0.5)}px`,
    },
    actionsArea: {
      marginTop: theme.spacing(1),
    },
  })
);

const SwitchCard: React.FC<SwitchCardProps> = ({
  switchObj,
  redirectUrl,
  cardActions,
  useCardActions,
  displayElo,
  ...props
}) => {
  const classes = useStyles();

  return (
    <Card {...props}>
      <CardContent>
        {redirectUrl && (
          <Button
            component={RouterLink}
            to={redirectUrl}
            startIcon={<ArrowBack />}
          >
            Go back
          </Button>
        )}
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography variant="h5" component="h2">
              {switchObj.name}
            </Typography>
          </Grid>
          {displayElo && (
            <Typography color="textSecondary">
              Elo: {Math.floor(switchObj.elo)}
            </Typography>
          )}
        </Grid>
        <Typography
          color="textSecondary"
          className={classes.typeText}
          variant="subtitle1"
        >
          {switchObj.type}
        </Typography>
        <Typography>{switchObj.description}</Typography>
        {!useCardActions && cardActions && (
          <div className={classes.actionsArea}>{cardActions}</div>
        )}
      </CardContent>
      {useCardActions && cardActions && (
        <CardActions>{cardActions}</CardActions>
      )}
    </Card>
  );
};

export default SwitchCard;
