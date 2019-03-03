import React from 'react';
import PeopleIcon from '@material-ui/icons/People';
import DescriptionIcon from '@material-ui/icons/Description';
import {
  Grid, Paper, withStyles, Checkbox, FormControlLabel, Button,
} from '@material-ui/core';
import SelectChips from './SelectChips';
import FormTextInput from './FormTextInput';

const NAMES = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const styles = theme => ({
  root: {
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing.unit * 2,
  },

  button: {
    textAlign: 'center',

    '& Button': {
      width: '50%',
    },
  },
});

const formItemSpacing = 16;

class SendMessagePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipients: [],
      message: '',
      sendToAll: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  handleChange(name) {
    return (event) => {
      this.setState({
        [name]: event.target.value,
      });
    };
  }

  handleCheckbox(event) {
    this.setState({
      sendToAll: event.target.checked,
    });
  }

  render() {
    const { classes } = this.props;
    const { recipients, sendToAll, message } = this.state;
    return (
      <Paper className={classes.root}>
        <Grid
          container
          justify="center"
          alignItems="stretch"
          spacing={formItemSpacing}
        >
          <Grid item xs={12}>
            <SelectChips
              icon={PeopleIcon}
              fullWidth
              label="Odbiorcy"
              items={NAMES}
              multiple
              value={recipients}
              disabled={sendToAll}
              onChange={this.handleChange('recipients')}
            />
            <FormControlLabel
              control={(
                <Checkbox
                  checked={sendToAll}
                  onChange={this.handleCheckbox}
                  value="DO WSZYSTKICH"
                />
              )}
              label="DO WSZYSTKICH"
            />

          </Grid>
          <Grid item xs={12}>
            <FormTextInput
              id="tripDesc"
              name="tripDesc"
              value={message}
              onChange={this.handleChange('message')}
              fullWidth
              multiline
              rows="4"
              maxCharLength={120}
              icon={DescriptionIcon}
              label="Treść wiadomości"
              autoFocus
            />
          </Grid>
          <Grid item className={classes.button} xs={12}>
            <Button
              onClick={this.handleSend}
              variant="contained"
              color="secondary"
            >
              Wyślij
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(SendMessagePanel);
