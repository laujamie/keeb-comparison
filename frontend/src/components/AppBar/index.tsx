import React from 'react';
import {
  AppBar as MuiAppBar,
  Container,
  Toolbar,
  Typography,
  Link,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const AppBar: React.FC = () => {
  return (
    <MuiAppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Link component={RouterLink} to="/" color="inherit">
            <Typography variant="h6" color="inherit">
              KeebComparison
            </Typography>
          </Link>
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
};

export default AppBar;
