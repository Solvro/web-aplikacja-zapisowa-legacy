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
    padding: '10%',
  },
});

function BadgeCell(props) {
  const { children, classes } = props;
  return <div className={classes.root}>{ children }</div>;
}


export default withStyles(styles)(BadgeCell);
