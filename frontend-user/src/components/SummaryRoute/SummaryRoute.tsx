import * as React from "react";
import SummaryRouteStyles from "./SummaryRouteStyles";
import {Grid, Paper, Typography, withStyles, WithStyles} from "@material-ui/core";
import {RoomMate} from "../../store/RoomMate/types";
import {Room} from "../ChooseRoomModal/RoomCard";
//@ts-ignore
import {Planet} from "react-kawaii";

interface SummaryRouteProps {
    roomMates: RoomMate[],
    room: Room,
}

class SummaryRoute extends React.Component<WithStyles<typeof SummaryRouteStyles> & SummaryRouteProps> {

    public render(): React.ReactNode {
        const {classes} = this.props;
        return (
            <div className={classes.container}>
                <Grid
                    container={true}
                    item={true}
                    className={classes.paperContainer}
                    xl={7}
                    lg={8}
                    md={9}
                    sm={10}
                    xs={11}
                >
                    <Paper className={classes.paper}>
                        <Typography variant={"h3"} gutterBottom={true}>
                            {`To już wszystko`}
                        </Typography>
                        <div className={classes.planet}>
                            <Planet size={250} mood="excited" color="#009688"/>
                        </div>
                        <div>
                            {
                                this.props.roomMates
                                    ?
                                    <span>
                                        <Typography
                                            variant={"body1"}>Numer pokoju: {this.props.room.number}</Typography>
                                        <Typography variant={"body1"}>Znajomi z twojej grupy pokojowej:</Typography>
                                        {this.props.roomMates.map(rm => <Typography
                                            variant={"body2"}>{rm.name}</Typography>)}
                                    </span>
                                    :
                                    (<span>
                                        <Typography variant={"h5"}>
                                            Świetnie, że jedziesz z nami Michał!
                                        </Typography>
                                        <Typography variant={"subheading"}>
                                            Kiedy krasnoludki przydzielą Cię do pokoju, od razu damy Ci znać
                                        </Typography>
                                    </span>)
                            }
                        </div>
                    </Paper>
                </Grid>
            </div>
        );
    }
}

export default withStyles(SummaryRouteStyles, {withTheme: true})(SummaryRoute);
