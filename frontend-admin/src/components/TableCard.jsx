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
  headerContainer: {
    display: 'flex',
    flex: 1,
    padding: theme.spacing.unit * 2,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  headerItem: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'column',
  },
  cardHeader: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    padding: theme.spacing.unit * 2,
    fontWeight: 'bold',
    backgroundColor: '#EEE',
  },
});

const TableCard = (props) => {
  const { classes, topic, header, columns, rows, onRemove, onEdit } = props;

  return (
    <Paper className={classes.root}>
      <div className={classes.cardHeader}>
        { topic }
      </div>
      <div className={classes.headerContainer}>
        {
        header.map(col => (
          <div key={col.key} className={classes.headerItem}>
            <div>
              {col.key}
            </div>
            <div>
              {col.value}
            </div>
          </div>
        ))
      }

      </div>
      <DynamicTable onRemove={onRemove} rows={rows} headers={columns} onEdit={onEdit} />
    </Paper>
  );
};

export default withStyles(styles)(TableCard);
