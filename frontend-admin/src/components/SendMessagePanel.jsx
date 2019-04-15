import React from 'react';
import PeopleIcon from '@material-ui/icons/People';
import DescriptionIcon from '@material-ui/icons/Description';
import {
  Grid, Paper, withStyles, Checkbox, FormControlLabel, Button,
} from '@material-ui/core';
import SelectChips from './SelectChips';
import FormTextInput from './FormTextInput';
import { getParticipantsList } from '../store/Api';

const styles = theme => ({
  root: {
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing.unit * 2,
  },

  button: {
    textAlign: 'center',

    '& Button': {
      width: '30%',
    },
  },
});

const formItemSpacing = 16;

class SendMessagePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      all_students: false,
      not_registered: false,
      registered: false,
      indexes: [],
      students: [],
      subject: '',
      body: ''
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
      all_students: event.target.checked,
    });
  }

  async componentDidMount() {
    const { eventName } = this.props;
    const { students } = await getParticipantsList(eventName);
    this.setState({
      students
    })
  }

  sendButton = () => {
    const { handleSend } = this.props;
    const { students } = this.state;
    const newStateStudents = this.state.indexes.map(name => students.find((stud) => stud.name == name).index);
    const newState = this.state;
    newState.indexes = newStateStudents;
    handleSend(newState)
  }

  render() {
    const { classes } = this.props;
    const { indexes, students, all_students, body, subject } = this.state;
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
              items={students.map(student => student.name)}
              multiple
              value={indexes}
              disabled={all_students}
              onChange={this.handleChange('indexes')}
            />
            <FormControlLabel
              control={(
                <Checkbox
                  checked={all_students}
                  onChange={this.handleCheckbox}
                  value="DO WSZYSTKICH"
                />
              )}
              label="DO WSZYSTKICH"
            />

          </Grid>
          <Grid item xs={12}>
            <FormTextInput
              id="subject"
              name="subject"
              value={subject}
              onChange={this.handleChange('subject')}
              fullWidth
              rows="4"
              icon={DescriptionIcon}
              label="Temat"
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextInput
              id="msgbody"
              name="msgbody"
              value={body}
              onChange={this.handleChange('body')}
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
              onClick={this.sendButton}
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
