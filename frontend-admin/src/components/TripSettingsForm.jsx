import React from 'react'
import { withStyles, Grid, Button, Paper } from '@material-ui/core';
import DateIcon from '@material-ui/icons/DateRange';
import HotelIcon from '@material-ui/icons/LocalHotel';
import LocationIcon from "@material-ui/icons/LocationOn";
import DescriptionIcon from '@material-ui/icons/Description';
import FormTextInput from './FormTextInput';
import UploadFileInput from './UploadFileInput';
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment'
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
            width: '50%'
        }
    }
});

const formItemSpacing = 16;

class TripSettingsForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tripName: '',
            tripDesc: '',
            tripLocation: '',
            tripHotel: '',
            participantsFile: null,
            bgImageFile: null,
            dateStart: new Date(),
            dateEnd: new Date(),
        }
    }

    handleDateChange = name => date => {
        this.setState({
            [name]: date,
        });
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSend = () => {
        console.log(this.state)
    }

    render() {
        const { classes } = this.props
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
                                    id={'tripName'}
                                    name={'tripName'}
                                    onChange={this.handleChange('tripName')}
                                    fullWidth
                                    icon={DateIcon}
                                    label={'Nazwa wycieczki'} />
                            </Grid>
                            <Grid item xs={12}>
                                <FormTextInput
                                    id={'tripDesc'}
                                    name={'tripDesc'}
                                    onChange={this.handleChange('tripDesc')}
                                    fullWidth
                                    multiline
                                    rows='4'
                                    maxCharLength={120}
                                    icon={DescriptionIcon}
                                    label={'Opis'} />
                            </Grid>
                            <Grid item xs={12}>
                                <FormTextInput
                                    id={'tripLocation'}
                                    name={'tripLocation'}
                                    onChange={this.handleChange('tripLocation')}
                                    fullWidth
                                    icon={LocationIcon}
                                    label={'Miejsce wycieczki'} />
                            </Grid>
                            <Grid item xs={12}>
                                <FormTextInput
                                    id={'tripHotel'}
                                    name={'tripHotel'}
                                    onChange={this.handleChange('tripHotel')}
                                    fullWidth
                                    icon={HotelIcon}
                                    label={'Ośrodek noclegowy'} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <UploadFileInput
                                    id={'participantsFile'}
                                    name={'participantsFile'}
                                    onChange={this.handleChange('participantsFile')}
                                    label={'Uczestnicy'} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <UploadFileInput
                                    id={'bgImageFile'}
                                    name={'bgImageFile'}
                                    onChange={this.handleChange('bgImageFile')}
                                    label={'Zdjęcie tła'} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <DatePicker
                                    fullWidth
                                    margin="normal"
                                    label={<LabelWithIcon fontSize='small' icon={DateIcon} label='Data rozpoczęcia' />}
                                    onChange={this.handleDateChange('dateStart')}
                                    value={this.state.dateStart}
                                    id={'dateStart'} name={'dateStart'}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <DatePicker
                                    fullWidth
                                    margin="normal"
                                    label={<LabelWithIcon fontSize='small' icon={DateIcon} label='Data zakończeniaaaaa' />}
                                    onChange={this.handleDateChange('dateEnd')}
                                    value={this.state.dateEnd}
                                    id={'dateEnd'} name={'dateEnd'}
                                />
                            </Grid>

                            <Grid item className={classes.button} xs={12}>
                                <Button
                                    onClick={this.handleSend}
                                    variant='contained'
                                    color="primary">Stwórz</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </MuiPickersUtilsProvider>
            </form>
        )
    }
}

export default withStyles(styles)(TripSettingsForm)