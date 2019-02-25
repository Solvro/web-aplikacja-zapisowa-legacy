import React from 'react'
import { withStyles, Grid, Button } from '@material-ui/core';
import DateIcon from "@material-ui/icons/DateRange";
import HotelIcon from "@material-ui/icons/LocalHotel";
import LocationIcon from "@material-ui/icons/LocationOn";
import DescriptionIcon from "@material-ui/icons/Description";
import FormTextInput from './FormTextInput';
import UploadFileInput from './UploadFileInput';
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment'

const styles = theme => ({
    root: {
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: theme.spacing.unit * 2,
    },

    button: {
        marginLeft: 'auto',
        marginRight: 'auto',
        margin: theme.spacing.unit * 2,
        width: '75%',
        textAlign: 'center'
    }
});

class TripSettingsForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dateStart: new Date(),
            dateEnd: new Date()
        }
    }

    handleDateChange = name => date => {
        this.setState({
            [name]: date,
        });
    };

    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <FormTextInput icon={DateIcon} label={'Nazwa wycieczki'} />
                <FormTextInput multiline rows='4' maxCharLength={120} icon={DescriptionIcon} label={'Opis'} />
                <FormTextInput icon={LocationIcon} label={'Miejsce wycieczki'} />
                <FormTextInput icon={HotelIcon} label={'Ośrodek noclegowy'} />
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    spacing={24}
                >
                    <Grid item xs={12} sm={6}>
                        <UploadFileInput onChange={console.log} label={'Uczestnicy'} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <UploadFileInput label={'Zdjęcie tła'} />
                    </Grid>
                </Grid>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                        spacing={24}
                    >
                        <Grid item xs={12} sm={6}>
                            <DatePicker
                                fullWidth
                                margin="normal"
                                label="Date picker"
                                onChange={this.handleDateChange('dateStart')}
                                value={this.state.dateStart}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <DatePicker
                                fullWidth
                                margin="normal"
                                label="Date picker"
                                onChange={this.handleDateChange('dateEnd')}
                                value={this.state.dateEnd}
                            />
                        </Grid>
                    </Grid>
                </MuiPickersUtilsProvider>
                <div className={classes.button}>
                    <Button fullWidth variant='contained' color="secondary">Stwórz</Button>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(TripSettingsForm)