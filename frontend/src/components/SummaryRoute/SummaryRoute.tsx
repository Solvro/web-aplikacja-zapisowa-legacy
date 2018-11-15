import * as React from "react";
import SummaryRouteStyles from "./SummaryRouteStyles";
import {Grid, Paper, Typography, withStyles, WithStyles} from "@material-ui/core";
import {RoomMate} from "../../store/RoomMate/types";
import {Room} from "../ChooseRoomModal/RoomCard";


interface SummaryRotueProps {
    roomMates: RoomMate[],
    room: Room,
}

class SummaryRoute extends React.Component<WithStyles<typeof SummaryRouteStyles> & SummaryRotueProps> {

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
                        <Typography variant={"h3"}>
                            {`To już wszystko Michał`}
                        </Typography>
                        <Typography variant={"h5"}>
                            💖 Świetnie, że jedziesz z nami 💖
                        </Typography>
                        <div>
                            {
                                this.props.roomMates
                                ?
                                    <span>
                                        <Typography variant={"body1"}>Numer pokoju: {this.props.room.number}</Typography>
                                        <Typography variant={"body1"}>Znajomi z twojej grupy pokojowej:</Typography>
                                        {this.props.roomMates.map(rm => <Typography variant={"body2"}>{rm.name}</Typography>)}
                                    </span>
                                :
                                    (<span>
                                        <img src={"https://i.kym-cdn.com/entries/icons/mobile/000/002/394/437px-Clarinet_boy_seen_things.jpg"}/>
                                        <Typography variant={"h6"}>
                                            Kiedy krasnoludki przydzielą was do pokoi, od razu się o tym dowiecie. Tymczasem
                                            przygotowujcie się na rajd i zbierajcie siły. BĘDZIE POTĘŻNIE!
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
