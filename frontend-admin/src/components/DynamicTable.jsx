import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import BadgeCell from './BadgeCell';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(20, 20, 20, 0.6)',
  },
  body: {
    fontSize: 16,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '90%',
    marginLeft: '5%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(even)': {
      backgroundColor: 'rgba(50, 50, 50, 0.1)',
    },

    '&:nth-of-type(odd)': {
      backgroundColor: 'rgba(50, 50, 50, 0.05)',
    },
  },
});

const StyledTableRow = withStyles({
  root: {
    borderRadius: 25,
    height: 48,
    backgroundColor: 'rgba(20, 20, 20, 0.2)',
  },
})(TableRow);

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return {
    id, name, calories, fat, carbs, protein,
  };
}

const rows = [
  createData(<BadgeCell>10</BadgeCell>, 159, 6.0, 6, 'Zenski'),
  createData(<BadgeCell>25</BadgeCell>, 237, 9.0, 3, 'Meski'),
  createData(<BadgeCell>15</BadgeCell>, 262, 16.0, 6.0, 'Meski'),
  createData(<BadgeCell>1</BadgeCell>, 305, 3.7, 4.3, 'Meski'),
  createData(<BadgeCell>14</BadgeCell>, 356, 49, 3.9, 'Meski'),
];

function DynamicTable(props) {
  const { classes } = props;


  return (

    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Numer</CustomTableCell>
            <CustomTableCell align="center">Pojemnośc</CustomTableCell>
            <CustomTableCell align="center">Miejsca wolne</CustomTableCell>
            <CustomTableCell align="center">Miejsca zajęte</CustomTableCell>
            <CustomTableCell align="center">Rodzaj</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <StyledTableRow style={{ marginTop: '20px' }} className={classes.row} key={row.id}>
              <CustomTableCell component="th" scope="row">
                {row.name}
              </CustomTableCell>
              <CustomTableCell align="center">{row.calories}</CustomTableCell>
              <CustomTableCell align="center">{row.fat}</CustomTableCell>
              <CustomTableCell align="center">{row.carbs}</CustomTableCell>
              <CustomTableCell align="center">{row.protein}</CustomTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(DynamicTable);
