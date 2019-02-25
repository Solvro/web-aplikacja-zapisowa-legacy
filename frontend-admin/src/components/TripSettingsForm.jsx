import React from 'react'
import { withStyles, TextField } from '@material-ui/core';
import DateIcon from "@material-ui/icons/DateRange";
import HotelIcon from "@material-ui/icons/LocalHotel";
import LocationIcon from "@material-ui/icons/LocationOn";
import DescriptionIcon from "@material-ui/icons/Description";
import FormTextInput from './FormTextInput';

const styles = theme => ({
    root: {
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: theme.spacing.unit * 2,
        border: '1px solid black'
    },
});

class TripSettingsForm extends React.Component {

    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <FormTextInput icon={DateIcon} label={'Nazwa wycieczki'} />
                <FormTextInput multiline rows='4' maxCharLength={120} icon={DescriptionIcon} label={'Opis'} />
                <FormTextInput icon={LocationIcon} label={'Miejsce wycieczki'} />
                <FormTextInput icon={HotelIcon} label={'Ośrodek noclegowy'} />
            </div>
        )
    }
}

export default withStyles(styles)(TripSettingsForm)