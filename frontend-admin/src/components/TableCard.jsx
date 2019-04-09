import React from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import DynamicTable from './DynamicTable';


const styles = theme => ({
  root: {
    width: '90%',
    marginLeft: '5%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
});

const TableCard = (props) => {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
			<DynamicTable />
		</Paper>
  );
};

export default withStyles(styles)(TableCard);
