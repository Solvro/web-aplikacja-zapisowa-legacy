import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import React from 'react';
import { manageTripScreenStyles } from './ManageTripScreenStyle';
import Paper from '@material-ui/core/Paper/Paper';
import TripCard from './TripCard';
import Typography from '@material-ui/core/Typography';
import { withRouter, Link } from 'react-router-dom';
import { getAllEvents } from '../../store/Api';
import add from '../../img/add.png';

class ManageTripScreen extends React.Component {

    constructor(props) {
        super(props);

        this.createNewTrip = this.createNewTrip.bind(this);
        this.state = {
            trips: []
        };
        this.loadEvents = this.loadEvents.bind(this)
    }

    createNewTrip = () => {
        const { trips } = this.state;
        const updatedTrips = [{
            name: 'Trip ' + trips.length,
            description: 'Another Awesome Trip',
            overlayText: 'Overlay',
            image: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Ar%C4%81k_to_R%C4%81zeq%C4%81n_roud.jpg',
            onClick: () => { }
        }, ...trips];
        this.setState({ trips: updatedTrips });
    };

    async loadEvents() {
        const events = await getAllEvents();
        events.forEach((evt) => {
            evt.image = "http://" + evt.image_link;
            delete evt.image_link;
        })
        return events;
    }

    async componentDidMount() {
        const trips = await this.loadEvents()
        this.setState({
            trips
        })
    }

    render() {
        const { classes } = this.props;
        const { trips } = this.state;
        return (
            <div className={classes.container}>
                <Grid container >
                    <Grid style={{ margin: 'auto' }} item xs={12} sm={10} md={9} >
                        <Paper square={true} className={classes.paperContainer}>
                            <Typography className={classes.mainHeader} variant='h1'>
                                Wycieczki
                            </Typography>
                            <Grid wrap='wrap' xs-justify='center' container spacing={40}>
                                {
                                    trips.map((trip, idx) =>
                                        <Grid
                                            key={idx}
                                            item
                                            lg={4}
                                            md={6}
                                            xs={12}
                                        >
                                            <Link to={`/trips/${encodeURIComponent(trip.name)}`} style={{ textDecoration: 'none' }}>
                                                <TripCard
                                                    overlayText={trip.name}
                                                    description={trip.description}
                                                    name={trip.name}
                                                    image={trip.image}
                                                />
                                            </Link>
                                        </Grid>
                                    )
                                }
                                <Grid
                                    key={'createNewEventTile'}
                                    item
                                    lg={4}
                                    md={6}
                                    xs={12}
                                >
                                    <Link to={`/trips/create`} style={{ textDecoration: 'none' }}>
                                        <TripCard
                                            overlayText="Dodaj nową wycieczkę"
                                            description="Zaplanuj nową wycieczkę jest ich zdecydowanie za mało na twoim wydziale"
                                            name="Dodaj nową wycieczkę"
                                            image={add}
                                        />
                                    </Link>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );

    }
}

export default withRouter(withStyles(manageTripScreenStyles)(ManageTripScreen));