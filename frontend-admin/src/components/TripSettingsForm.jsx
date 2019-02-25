import React from 'react'
import { withStyles, Grid } from '@material-ui/core';
import DateIcon from "@material-ui/icons/DateRange";
import HotelIcon from "@material-ui/icons/LocalHotel";
import LocationIcon from "@material-ui/icons/LocationOn";
import DescriptionIcon from "@material-ui/icons/Description";
import FormTextInput from './FormTextInput';
import UploadFileInput from './UploadFileInput';

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
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    spacing={24}
                >
                    <Grid item xs={12} sm={6}>
                        <UploadFileInput onChange={console.log} label={'Uczestnicy'}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <UploadFileInput label={'Zdjęcie tła'}/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(TripSettingsForm)