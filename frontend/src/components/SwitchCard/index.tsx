import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardProps,
} from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { ArrowBack } from '@material-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { Switch } from '../../queries/switchQueries';

type SwitchCardProps = CardProps & {
  switchObj: Switch;
  redirectUrl?: string;
  approveSwitch?: any;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typeText: {
      textTransform: 'capitalize',
      marginTop: `-${theme.spacing(0.5)}px`,
    },
  })
);

const SwitchCard: React.FC<SwitchCardProps> = ({
  switchObj,
  redirectUrl,
  approveSwitch,
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
        <Typography variant="h5" component="h2">
          {switchObj.name}
        </Typography>
        <Typography
          color="textSecondary"
          className={classes.typeText}
          variant="subtitle1"
        >
          {switchObj.type}
        </Typography>
        <Typography>{switchObj.description}</Typography>
        {approveSwitch && (
          <Button onClick={approveSwitch} variant="contained" color="primary">
            Approve
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default SwitchCard;
