import React from 'react';
import {
  withStyles, Grid, Button, Paper,
} from '@material-ui/core';
import DateIcon from '@material-ui/icons/DateRange';
import HotelIcon from '@material-ui/icons/LocalHotel';
import LocationIcon from '@material-ui/icons/LocationOn';
import DescriptionIcon from '@material-ui/icons/Description';
import ImageIcon from '@material-ui/icons/Image';
import AttachmentIcon from '@material-ui/icons/Attachment';
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import FormTextInput from './FormTextInput';
import UploadFileInput from './UploadFileInput';
import LabelWithIcon from './LabelWithIcon';

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

class TripSettingsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tripName: '',
      tripDesc: '',
      tripLocation: '',
      tripHotel: '',
      participantsFile: null,
      bgImageFile: null,
      dateStart: new Date(),
      dateEnd: new Date(),
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  handleDateChange(name) {
    return (date) => {
      this.setState({
        [name]: date,
      });
    };
  }

  handleChange(name) {
    return (event) => {
      this.setState({
        [name]: event.target.value,
      });
    };
  }

  handleSend() {
    console.log(this.state);
  }

  render() {
    const {
      tripName, tripDesc, tripLocation, tripHotel, participantsFile, bgImageFile, dateStart, dateEnd,
    } = this.state;
    const { classes } = this.props;
    return (
      <form>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Paper className={classes.root}>
            <Grid
              container
              justify="center"
              alignItems="stretch"
              spacing={formItemSpacing}
            >
              <Grid item xs={12}>
                <FormTextInput
                  autoFocus
                  id="tripName"
                  name="tripName"
                  value={tripName}
                  onChange={this.handleChange('tripName')}
                  fullWidth
                  icon={DateIcon}
                  label="Nazwa wycieczki"
                />
              </Grid>
              <Grid item xs={12}>
                <FormTextInput
                  id="tripDesc"
                  name="tripDesc"
                  value={tripDesc}
                  onChange={this.handleChange('tripDesc')}
                  fullWidth
                  multiline
                  rows="4"
                  maxCharLength={120}
                  icon={DescriptionIcon}
                  label="Opis"
                />
              </Grid>
              <Grid item xs={12}>
                <FormTextInput
                  id="tripLocation"
                  name="tripLocation"
                  value={tripLocation}
                  onChange={this.handleChange('tripLocation')}
                  fullWidth
                  icon={LocationIcon}
                  label="Miejsce wycieczki"
                />
              </Grid>
              <Grid item xs={12}>
                <FormTextInput
                  id="tripHotel"
                  name="tripHotel"
                  value={tripHotel}
                  onChange={this.handleChange('tripHotel')}
                  fullWidth
                  icon={HotelIcon}
                  label="Ośrodek noclegowy"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <UploadFileInput
                  id="participantsFile"
                  name="participantsFile"
                  value={participantsFile}
                  onChange={this.handleChange('participantsFile')}
                  label={<LabelWithIcon fontSize="small" icon={AttachmentIcon} label="Uczestnicy" />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <UploadFileInput
                  id="bgImageFile"
                  name="bgImageFile"
                  value={bgImageFile}
                  onChange={this.handleChange('bgImageFile')}
                  label={<LabelWithIcon fontSize="small" icon={ImageIcon} label="Zdjęcie tła" />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  fullWidth
                  margin="normal"
                  label={<LabelWithIcon fontSize="small" icon={DateIcon} label="Data rozpoczęcia" />}
                  onChange={this.handleDateChange('dateStart')}
                  value={dateStart}
                  id="dateStart"
                  name="dateStart"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  fullWidth
                  margin="normal"
                  label={<LabelWithIcon fontSize="small" icon={DateIcon} label="Data zakończeniaaaaa" />}
                  onChange={this.handleDateChange('dateEnd')}
                  value={dateEnd}
                  id="dateEnd"
                  name="dateEnd"
                />
              </Grid>

              <Grid item className={classes.button} xs={12}>
                <Button
                  onClick={this.handleSend}
                  variant="contained"
                  color="secondary"
                >
                  Stwórz
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </MuiPickersUtilsProvider>
      </form>
    );
  }
}

export default withStyles(styles)(TripSettingsForm);
