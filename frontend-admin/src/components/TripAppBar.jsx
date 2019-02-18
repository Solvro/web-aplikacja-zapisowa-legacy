import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    zIndex: theme.zIndex.drawer + 1,
  },
});

const SimpleAppBar = ({ classes }) => (
  <AppBar position="fixed" className={classes.root}>
    <Toolbar>
      <Typography variant="h6" color="inherit" noWrap>
        Aplikacja zapisowa
      </Typography>
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(SimpleAppBar);
