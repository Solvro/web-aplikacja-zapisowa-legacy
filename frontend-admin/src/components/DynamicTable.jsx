import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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

const renderCustomTableCellWithComponent = (id, idx) => (
  <CustomTableCell component="th" scope="row" key={idx}>
    <BadgeCell>
      {id}
    </BadgeCell>
  </CustomTableCell>
);

const renderCustomTableCell = (content, idx) => (
  <CustomTableCell align="center" key={idx}>
    {content}
  </CustomTableCell>
);


function createData(primaryKey, row) {
  const newRow = {};
  Object.keys(row).forEach((key, idx) => {
    newRow[key] = (key === primaryKey ? renderCustomTableCellWithComponent(row[key], idx) : renderCustomTableCell(row[key], idx));
  });
  // NOTE: this converts objects to arrays
  return newRow;
}

function DynamicTable(props) {
  const { classes, headers, rows } = props;
  const primaryKey = headers[0];
  const parsedRows = rows.map(row => createData(primaryKey, row));

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          {
            headers.map(header => <CustomTableCell key={header} align="center">{header}</CustomTableCell>)
          }
        </TableRow>
      </TableHead>
      <TableBody>
        {parsedRows.map((row, idx) => (
          <StyledTableRow style={{ marginTop: '20px' }} className={classes.row} key={idx}>
            {
              Object.keys(row).map(key => row[key])
            }
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default withStyles(styles)(DynamicTable);
