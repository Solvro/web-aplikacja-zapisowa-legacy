import * as React from 'react';
import {Grid, Paper, Typography, withStyles, WithStyles} from "@material-ui/core";
import {chooseRoomModalStyles} from "./ChooseRoomModalStyles";
import {loggedUser, userGroup} from "../../fake/UsersData";
import {UserChip} from "../UserChip/UserChip";
import {Room, RoomCard} from "./RoomCard";
import {roomsToChoose} from "../../fake/RoomsData";

const fakeProps = {
    loggedUser,
    userGroup,
};

class UserFormRoute extends React.Component<WithStyles<typeof chooseRoomModalStyles>> {
    public render(): React.ReactNode {
        const {classes} = this.props;
        return (
            <Grid
                container={true}
                item={true}
                className={classes.paperContainer}
                xl={8}
                sm={10}
                xs={12}
            >
                <Paper
                    className={classes.paper}
                >
                    <Typography variant={"h5"} color={"textSecondary"}>
                        Twoja grupa
                    </Typography>
                    <Grid container={true} className={classes.userChipsContainer}>
                        <Grid item={true} xs={12} sm={6}>
                            <UserChip
                                faculty={fakeProps.loggedUser.faculty}
                                name={fakeProps.loggedUser.name}
                                isLoggedUser={true}
                            />
                        </Grid>
                        {userGroup.map((user, index) => {
                            return (
                                <Grid item={true} xs={12} sm={6} key={index}>
                                    <UserChip
                                    faculty={user.faculty}
                                    name={user.name}
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                    <Typography variant={"h5"} color={"textSecondary"}>
                        Wybierz pokój
                    </Typography>
                    <Grid container={true}>
                        {roomsToChoose.map((room: Room, index: number) => {
                            return (
                                <Grid item={true} xs={12} sm={6} md={4} lg={3} style={{padding: '0.5em'}} key={index}>
                                    <RoomCard room={room}/>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Paper>
            </Grid>
        );
    }
}

export default withStyles(chooseRoomModalStyles, {withTheme: true})(UserFormRoute);