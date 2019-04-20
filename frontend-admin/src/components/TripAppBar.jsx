import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { logout } from '../store/Api';

const styles = theme => ({
  root: {
    zIndex: theme.zIndex.drawer + 1,
  },
  button: {
    margin: theme.spacing.unit,
    marginLeft: 'auto',
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

const logoutButtonStyles = theme => ({
  label: {
    color: 'white',
  },
});

const LogoutButton = withStyles(logoutButtonStyles)(Button);

function logoutAndChangeLocation(history) {
  logout();
  if (history) {
    history.replace('/');
  } else {
    // eslint-disable-next-line no-undef
    window.location.replace('/');
  }
}

const SimpleAppBar = ({ classes, history }) => (
  <AppBar position="fixed" className={classes.root}>
    <Toolbar>
      <Typography variant="h6" color="inherit" noWrap>
        Aplikacja zapisowa
      </Typography>
      <LogoutButton className={classes.button} onClick={() => logoutAndChangeLocation(history)}>
        Wyloguj
        <PowerSettingsNewIcon className={classes.rightIcon} />
      </LogoutButton>
    </Toolbar>
  </AppBar>
);

export default withRouter(withStyles(styles)(SimpleAppBar));
