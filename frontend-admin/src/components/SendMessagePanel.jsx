import React from 'react';
import PeopleIcon from '@material-ui/icons/People';
import DescriptionIcon from '@material-ui/icons/Description';
import {
  Grid, Paper, withStyles, FormControlLabel, RadioGroup, FormControl, FormLabel, Button, Radio,
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
      radioGroup: 'custom',
      selectedStudents: [],
      students: [],
      subject: '',
      body: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.sendButton = this.sendButton.bind(this);
  }


  async componentDidMount() {
    const { eventName } = this.props;
    const { students } = await getParticipantsList(eventName);
    this.setState({
      students,
    });
  }

  handleChange(name) {
    return (event) => {
      this.setState({
        [name]: event.target.value,
      });
    };
  }

  sendButton() {
    const { handleSend } = this.props;
    const {
      students, selectedStudents, radioGroup, subject, body,
    } = this.state;
    const indexes = selectedStudents.map(name => students.find(stud => stud.name === name).index);
    const newState = {
      indexes,
      subject,
      body,
    };
    if (radioGroup !== 'custom') {
      newState[radioGroup] = true;
    }
    handleSend(newState);
  }

  render() {
    const { classes } = this.props;
    const {
      students, selectedStudents, radioGroup, body, subject,
    } = this.state;
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
              items={students.map(student => `${student.name} ${student.index}`)}
              multiple
              value={selectedStudents}
              disabled={radioGroup !== 'custom'}
              onChange={this.handleChange('selectedStudents')}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Grupowe maile</FormLabel>
              <RadioGroup
                aria-label="Gender"
                name="mailGroup"
                className={classes.group}
                value={radioGroup}
                onChange={this.handleChange('radioGroup')}
              >
                <FormControlLabel value="custom" control={<Radio />} label="Wybór manualny" />
                <FormControlLabel value="all_students" control={<Radio />} label="Do wszystkich" />
                <FormControlLabel value="not_registered" control={<Radio />} label="Do niezapisanych" />
                <FormControlLabel value="registered" control={<Radio />} label="Do zapisanych" />
              </RadioGroup>
            </FormControl>
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
