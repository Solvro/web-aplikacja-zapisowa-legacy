import React from 'react';
import {withStyles} from '@material-ui/core/styles';
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

function logoutAndReload() {
  logout().then(() => console.log('Logging out and cleaning'));
}

const SimpleAppBar = ({classes}) => (
  <AppBar position="fixed" className={classes.root}>
    <Toolbar>
      <Typography variant="h6" color="inherit" noWrap>
        Aplikacja zapisowa
      </Typography>
      <LogoutButton className={classes.button} onClick={logoutAndReload}>
        Wyloguj
        <PowerSettingsNewIcon className={classes.rightIcon} />
      </LogoutButton>
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(SimpleAppBar);
