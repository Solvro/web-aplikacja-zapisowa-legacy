import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid/Grid";
import React from 'react';
import { manageTripScreenStyles } from './ManageTripScreenStyle';
import Paper from "@material-ui/core/Paper/Paper";
import TripCard from "./TripCard";
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
// import { tripsMock } from '../mockData/trips';


class ManageTripScreen extends React.Component {

    constructor(props){
        super(props);


        this.createNewTrip = this.createNewTrip.bind(this);
        this.state = {
            trips: [
                {
                    name: 'AddingCard',
                    description: 'Kliknij aby dodać nową wycieczkę',
                    overlayText: '',
                    image: 'https://www.thoughtco.com/thmb/zQfnmMB7JGh55biV3b_ok_w79yE=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/simpsons1920-58b5a0013df78cdcd87a03bc.jpg',
                    onClick: this.createNewTrip
                }
            ]
        };
    }

    createNewTrip = () => {
        const { trips } = this.state;
        const updatedTrips = [{
            name: 'Trip ' + trips.length,
            description: 'Another Awesome Trip',
            overlayText: 'Overlay',
            image: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Ar%C4%81k_to_R%C4%81zeq%C4%81n_roud.jpg',
            onClick: () => {}
        }, ...trips];
        this.setState({ trips: updatedTrips });
    };

    render() {
        const { classes } = this.props;
        const { trips } = this.state;
        return (
            <div className={ classes.container }>
                <Grid container >
                    <Grid style={{margin: 'auto'}} item xs={ 12 } sm={10} md={ 9 } >
                        <Paper square={true} className={ classes.paperContainer }>
                            <Typography className={ classes.mainHeader } variant='h1'>
                                Wycieczki
                            </Typography>
                            <Grid wrap='wrap' xs-justify='center' container spacing={ 40}>
                                {
                                trips.map((trip, idx) =>
                                        <Grid
                                            key={idx}
                                            item
                                            lg={4}
                                            md={6}
                                            xs={12}
                                        >
                                            <TripCard
                                                overlayText={trip.overlayText}
                                                description={trip.description}
                                                name={trip.name}
                                                onClick={trip.onClick}
                                                image={trip.image}
                                                />
                                        </Grid>
                                    )
                                }
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );

    }
}

export default withRouter(withStyles(manageTripScreenStyles)(ManageTripScreen));