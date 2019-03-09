import * as React from "react";
import SummaryRouteStyles from "./SummaryRouteStyles";
import {Grid, Paper, Typography, withStyles, WithStyles} from "@material-ui/core";
import {RoomMate} from "../../store/RoomMate/types";
//@ts-ignore
import {Planet} from "react-kawaii";
import {ApplicationState} from "../../store";
import {connect} from "react-redux";

interface SummaryRouteProps {
    roomMates: RoomMate[],
    user: RoomMate,
}

const mapStateToProps = (state: ApplicationState): Partial<SummaryRouteProps> => {
    return {
        roomMates: state.roomMateState.roomMates,
        user: state.roomMateState.user,
    }
};

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
                                            variant={"body1"}>Numer pokoju: {"this.props.room.number"}</Typography>
                                        <Typography variant={"body1"}>Znajomi z twojej grupy pokojowej:</Typography>
                                        {this.props.roomMates.map((rm, idx)  =>
                                            (<Typography
                                                variant={"body2"}
                                                key={idx}
                                                >
                                                    {rm.name}
                                            </Typography>
                                            ))}
                                    </span>
                                    :
                                    (<span>
                                        <Typography variant={"h5"}>
                                            Świetnie, że jedziesz z nami {this.props.user.name}!
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

export default connect(mapStateToProps)(withStyles(SummaryRouteStyles, {withTheme: true})(SummaryRoute));
