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
} & RouteComponentProps<{}>;

const mapDispatchToProps = (dispatch: Dispatch<ApplicationState>) => ({
    signOut: () => { dispatch(signOut) }
});

class SummaryRoute extends React.Component<WithStyles<typeof SummaryRouteStyles> & SummaryRouteProps> {

    public componentDidMount(): void {
        localStorage.clear();
        this.props.signOut();
    }

    public render(): React.ReactNode {
        const {classes} = this.props;
        const {roomNumber, roomMates, user} = this.props.location.state;
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
                                        {roomMates.map((rm: RoomMate, idx: number)  =>
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

export default connect(null, mapDispatchToProps)(
    withRouter(
        withStyles(SummaryRouteStyles)(SummaryRoute)
    )
);
