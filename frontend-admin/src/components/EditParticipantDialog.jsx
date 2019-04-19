import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid, Dialog, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, Select, MenuItem } from '@material-ui/core';

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
    name: '',
    faculty: '',
    sex: '',
    status: '',
    index: '',
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount = () => {
    const { name, faculty, sex, status, index } = this.props;
    this.setState({
      name,
      faculty,
      sex,
      status,
      index
    });
  }

  render() {
    const { classes, isOpen, onClose } = this.props;
    return (
      <div>
        <Dialog
          open={ isOpen }
          onClose={ onClose }
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edycja uczestnika</DialogTitle>
          <DialogContent>
            <Grid container>
              <Grid item sm={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  inputProps={{
                    name: 'name',
                    id: 'name-simple'
                  }}
                  label="Imię i Nazwisko"
                  type="text"
                  fullWidth
                  value={this.state.name}
                  onChange={this.handleChange}
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
                      [...arrayRangeGenerator(1, 13)].map((num => <MenuItem key={num} value={num}>W{num}</MenuItem>))
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
                    <MenuItem value='S'>Zapisany Solowo</MenuItem>
                    <MenuItem value='G'>Zapisany Grupowo</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4}>
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel component="legend">Płeć</FormLabel>
                  <RadioGroup
                    aria-label="Płeć"
                    name="sex"
                    className={classes.group}
                    value={this.state.sex}
                    onChange={this.handleChange}
                  >
                    <FormControlLabel value="F" control={<Radio />} label="Kobieta" />
                    <FormControlLabel value="M" control={<Radio />} label="Mężczyzna" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => onClose(null)} color="primary">
              Anuluj
            </Button>
            <Button onClick={() => onClose(this.state)} color="primary">
              Zapisz
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(EditParticipantDialog);