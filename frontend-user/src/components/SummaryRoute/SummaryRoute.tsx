import * as React from "react";
import SummaryRouteStyles from "./SummaryRouteStyles";
import {Grid, Paper, Typography, withStyles, WithStyles} from "@material-ui/core";
//@ts-ignore
import {Planet} from "react-kawaii";
import {ApplicationState} from "../../store";
import {connect, Dispatch} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router";
import {signOut} from "../../store/RoomMate/actions";
import {RoomMate} from "../../store/RoomMate/types";

type SummaryRouteProps = {
    signOut: () => void
} & RouteComponentProps<{}> & WithStyles<typeof SummaryRouteStyles>;

const mapDispatchToProps = (dispatch: Dispatch<ApplicationState>) => ({
    signOut: () => {
        dispatch(signOut)
    }
});

class SummaryRoute extends React.Component<SummaryRouteProps> {

    public render(): React.ReactNode {
        const {classes, location, history, signOut} = this.props;

        if (!location.state) {
            history.replace('/AddRoomMates');
            return null;
        } else {
            const {roomNumber, roomMates, user} = location.state;
            localStorage.clear();
            signOut();

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
                                    roomMates && roomMates.length
                                        ?
                                        <span>
                                        <Typography variant={"body1"}>
                                            Numer pokoju: {roomNumber}
                                        </Typography>
                                        <Typography variant={"body1"}>Znajomi z twojej grupy pokojowej:</Typography>
                                            {roomMates.map((rm: RoomMate, idx: number) =>
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
                                            Świetnie, że jedziesz z nami {user.name}!
                                        </Typography>
                                            {roomNumber ?
                                                <>
                                                    <Typography variant={"subheading"}>
                                                        Jesteś zapisany do pokoju nr {roomNumber}.
                                                    </Typography>
                                                    <Typography variant={"subheading"}>
                                                        By uzyskać więcej informacji, skontaktuj się z administratorem wydarzenia.
                                                    </Typography>
                                                </> :
                                                <Typography variant={"subheading"}>
                                                    Kiedy krasnoludki przydzielą Cię do pokoju, od razu damy Ci znać
                                                </Typography>}
                                    </span>)
                                }
                            </div>
                        </Paper>
                    </Grid>
                </div>
            );
        }
    }
}

export default connect(null, mapDispatchToProps)(
    withRouter(
        withStyles(SummaryRouteStyles)(SummaryRoute)
    )
);
