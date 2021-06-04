import React, { useState } from 'react';
import {
  AppBar as MuiAppBar,
  Container,
  Toolbar,
  Typography,
  Link,
  Grid,
  Button,
  Menu,
  MenuItem,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Drawer,
  Divider,
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { AccountCircle, Menu as MenuIcon } from '@material-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../../state/atoms/userAtoms';
import { getUserProfile, signOut } from '../../services/firebaseService';

const drawerWidth = 200;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(1),
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    desktopMenu: {
      [theme.breakpoints.only('sm')]: {
        display: 'initial',
      },
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    mobileMenu: {
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
  })
);

const AppBar: React.FC = () => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isAuthenticated, isAdmin } = useRecoilValue(userState);

  const classes = useStyles();

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleLogout = async () => {
    await signOut();
    handleMenuClose();
  };

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(!drawerOpen);
  };

  const renderLogin = () => (
    <Grid item>
      <Button
        component={RouterLink}
        to="/login"
        color="inherit"
        variant="outlined"
      >
        Login
      </Button>
    </Grid>
  );

  const renderUser = () => {
    const user = getUserProfile();
    if (!user) return null;
    return (
      <Grid item>
        <IconButton color="inherit" onClick={handleMenuOpen}>
          <AccountCircle />
        </IconButton>
        <Menu
          id="user-details"
          anchorEl={menuAnchorEl}
          getContentAnchorEl={null}
          keepMounted
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem disabled>{user.email}</MenuItem>
          <Divider />
          {isAdmin && (
            <MenuItem component={RouterLink} to="/admin">
              Admin Dashboard
            </MenuItem>
          )}
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Grid>
    );
  };

  const renderSideMenu = () => (
    <div
      className={classes.drawerContainer}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        <ListItem button component={RouterLink} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={RouterLink} to="/leaderboard">
          <ListItemText primary="Leaderboard" />
        </ListItem>
        <ListItem button component={RouterLink} to="/match">
          <ListItemText primary="Match" />
        </ListItem>
        <ListItem button component={RouterLink} to="/switches/new">
          <ListItemText primary="Add Switch" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <MuiAppBar position="static" className={classes.appBar}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Grid container alignItems="center" wrap="nowrap">
            <Grid item>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                className={classes.menuButton}
                onClick={toggleDrawer}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer}
                classes={{ paper: classes.drawerPaper }}
              >
                {renderSideMenu()}
              </Drawer>
            </Grid>
            <Grid container item xs spacing={1}>
              <Grid item>
                <Link
                  component={RouterLink}
                  to="/"
                  color="inherit"
                  underline="none"
                >
                  <Typography variant="h6" color="inherit">
                    KeebComparison
                  </Typography>
                </Link>
              </Grid>
              <Grid item className={classes.desktopMenu}>
                <Button component={RouterLink} to="/" color="inherit">
                  Home
                </Button>
              </Grid>
              <Grid item className={classes.desktopMenu}>
                <Button
                  component={RouterLink}
                  to="/leaderboard"
                  color="inherit"
                >
                  Leaderboard
                </Button>
              </Grid>
              {isAuthenticated && (
                <>
                  <Grid item className={classes.desktopMenu}>
                    <Button component={RouterLink} to="/match" color="inherit">
                      Match
                    </Button>
                  </Grid>
                  <Grid item className={classes.desktopMenu}>
                    <Button
                      component={RouterLink}
                      to="/switches/new"
                      color="inherit"
                    >
                      Add Switch
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
            {isAuthenticated ? renderUser() : renderLogin()}
          </Grid>
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
};

export default AppBar;
