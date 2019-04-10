import React from 'react';
import { withStyles } from '@material-ui/core/styles';



const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '100px',
    color: 'white',
    height: '100%',
    width: '50%',
    padding: '6%',
  },
});

const BadgeCell = ({ children, classes }) => <div style={classes.root}>{ children }</div>;


export default withStyles(styles)(BadgeCell);
