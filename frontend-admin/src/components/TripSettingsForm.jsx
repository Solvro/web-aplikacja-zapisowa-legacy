import React from 'react';
import {
  withStyles, Grid, Button, Paper,
} from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';
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
    width: '100%',
    marginTop: theme.spacing.unit * 4,
    padding: theme.spacing.unit * 2,
  },

  button: {
    textAlign: 'center',
    width: '100%',
  },
});

const formItemSpacing = 16;

class TripSettingsForm extends React.Component {
  constructor(props) {
    super(props);
    const currDate = new Date().toISOString().slice(0, 10);
    this.state = {
      name: '',
      description: '',
      place: '',
      accommodation: '',
      participants: null,
      image: null,
      rooms: null,
      beginning_date: currDate,
      ending_date: currDate,
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleDateChange(name) {
    return (date) => {
      const isoDate = date.format('YYYY-MM-DD');
      this.setState({
        [name]: isoDate.toString(),
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

  async componentDidMount() {
    const { defaultState } = this.props;
    if(defaultState) {
      this.setState(defaultState)
    }
  }

  render() {
    const {
      name, description, place, accommodation, participants, image, beginning_date, ending_date, rooms,
    } = this.state;
    const { classes, onSubmit, eventNameChangingDisabled } = this.props;
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
                  id="name"
                  name="name"
                  value={name}
                  onChange={this.handleChange('name')}
                  fullWidth
                  icon={DateIcon}
                  label="Nazwa wycieczki"
                  disabled={eventNameChangingDisabled}
                />
              </Grid>
              <Grid item xs={12}>
                <FormTextInput
                  id="description"
                  name="description"
                  value={description}
                  onChange={this.handleChange('description')}
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
                  id="place"
                  name="place"
                  value={place}
                  onChange={this.handleChange('place')}
                  fullWidth
                  icon={LocationIcon}
                  label="Miejsce wycieczki"
                />
              </Grid>
              <Grid item xs={12}>
                <FormTextInput
                  id="accommodation"
                  name="accommodation"
                  value={accommodation}
                  onChange={this.handleChange('accommodation')}
                  fullWidth
                  icon={HotelIcon}
                  label="Ośrodek noclegowy"
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <UploadFileInput
                  accept=".csv"
                  id="participants"
                  name="participants"
                  value={participants}
                  onChange={this.handleChange('participants')}
                  label={<LabelWithIcon fontSize="small" icon={AttachmentIcon} label="Uczestnicy" />}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <UploadFileInput
                  accept=".csv"
                  id="rooms"
                  name="rooms"
                  value={rooms}
                  onChange={this.handleChange('rooms')}
                  label={<LabelWithIcon fontSize="small" icon={AttachmentIcon} label="Pokoje" />}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <UploadFileInput
                  accept="image/*"
                  id="image"
                  name="image"
                  value={image}
                  onChange={this.handleChange('image')}
                  label={<LabelWithIcon fontSize="small" icon={ImageIcon} label="Zdjęcie tła" />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  fullWidth
                  margin="normal"
                  label={<LabelWithIcon fontSize="small" icon={DateIcon} label="Data rozpoczęcia" />}
                  onChange={this.handleDateChange('beginning_date')}
                  value={beginning_date}
                  id="beginning_date"
                  name="beginning_date"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  fullWidth
                  margin="normal"
                  label={<LabelWithIcon fontSize="small" icon={DateIcon} label="Data zakończenia" />}
                  onChange={this.handleDateChange('ending_date')}
                  value={ending_date}
                  id="ending_date"
                  name="ending_date"
                />
              </Grid>

              <Grid container alignItems="center" alignContent="centera" justify="center">
                <Grid className={classes.button} item xs={2}>
                  <Link to="/trips">
                    <Button
                      variant="contained"
                      color="default"
                    >
                      Powrót
                    </Button>
                  </Link>
                </Grid>
                <Grid className={classes.button} item xs={2}>
                  <Button
                      onClick={(() => onSubmit(this.state))}
                      variant="contained"
                      color="primary"
                    >
                      Stwórz
                    </Button>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </MuiPickersUtilsProvider>
      </form>
    );
  }
}

export default withRouter(withStyles(styles)(TripSettingsForm));
