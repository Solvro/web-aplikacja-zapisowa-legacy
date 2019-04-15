import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid, Dialog, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, InputLabel, Select, MenuItem } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
    marginLeft: 0,
  },
  group: {
    display: 'flex',
    flexDirection: 'row',
    margin: `${theme.spacing.unit}px 0`,
  },
});

function* arrayRangeGenerator(start, end) {
  for (var i = start; i <= end; i++) {
    yield i;
  }
}

class EditParticipantDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Open form dialog
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edycja uczestnika</DialogTitle>
          <DialogContent>
            <Grid container>
              <Grid item sm={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Imię i Nazwisko"
                  type="text"
                  fullWidth
                />
              </Grid>
              <Grid item sm={4}>
                <FormControl className={classes.formControl}>
                  <FormLabel>Wydział</FormLabel>
                  <Select
                    value={this.state.faculty}
                    onChange={this.handleChange}
                    inputProps={{
                      name: 'faculty',
                      id: 'faculty-simple',
                    }}
                  >
                    {
                      [...arrayRangeGenerator(1, 13)].map((num => <MenuItem value={num}>W{num}</MenuItem>))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4}>
                <FormControl className={classes.formControl}>
                  <FormLabel>Status</FormLabel>
                  <Select
                    value={this.state.status}
                    onChange={this.handleChange}
                    inputProps={{
                      name: 'status',
                      id: 'status-simple',
                    }}
                  >
                    <MenuItem value='N'>Niezapisany</MenuItem>
                    <MenuItem value='Z'>Zapisany</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4}>
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel component="legend">Płeć</FormLabel>
                  <RadioGroup
                    aria-label="Gender"
                    name="gender1"
                    className={classes.group}
                    value={this.state.value}
                    onChange={this.handleChange}
                  >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Anuluj
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Zapisz
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(EditParticipantDialog);