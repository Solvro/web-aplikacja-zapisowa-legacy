import * as React from 'react';
import {Button, Grid, Modal, Paper, Typography, withStyles, WithStyles} from "@material-ui/core";
import {chooseRoomModalStyles} from "./ChooseRoomModalStyles";
import {loggedUser} from "../../fake/UsersData";
import {UserChip} from "../UserChip/UserChip";
import {Room, RoomCard} from "./RoomCard";
import {roomsToChoose} from "../../fake/RoomsData";
import {ApplicationState} from "../../store";
import {RoomMate} from "../../store/RoomMate/types";
import {connect} from "react-redux";
import BackButton from "../BackButton";
import {NavLink} from "react-router-dom";

const fakeState = {
    loggedUser,
};

type ChooseRoomModalProps = {
    roomMates: RoomMate[];
}
const mapStateToProps = (state: ApplicationState): Partial<ChooseRoomModalProps> => {
    return {roomMates: state.roomMateState.roomMates}
};

class ChooseRoomModal extends React.Component<WithStyles<typeof chooseRoomModalStyles> & ChooseRoomModalProps> {
    state = {
        loggedUser: fakeState.loggedUser,
        rooms: roomsToChoose,
        isModalVisible: false,
        pickedRoom: {
            number: 0,
            capacity: 0,
            occupancy: 0,
        },
    };

    componentDidMount() {
        this.changeOccupancy();
    }

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
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.isModalVisible}
                    onClose={() => this.setState({isModalVisible: false})}
                    className={classes.modal}
                >
                    <Paper
                        className={classes.modalPaper}
                        square={true}
                    >
                        <Typography variant="h5" id="modal-title">
                            {`Czy na pewno? Chcesz mieszkać w pokoju ${this.state.pickedRoom.number}?`}
                        </Typography>
                        <Typography variant="body1" id="simple-modal-description">
                            {`Wybierasz ${this.state.pickedRoom.capacity}-osobowy pokój nr ${this.state.pickedRoom.number}.
                            Po twojej rezerwacji jego stan zapełnienia zmieni się z ${this.state.pickedRoom.occupancy}/${this.state.pickedRoom.capacity}
                            do ${this.state.pickedRoom.occupancy + this.props.roomMates.length + 1}/${this.state.pickedRoom.capacity}`}
                        </Typography>
                        <div className={classes.buttonWrapper}>
                            <Button
                                className={classes.button}
                                variant={"contained"}
                                color={"default"}
                                onClick={() => this.setState({isModalVisible: false})}
                            >
                                    WRÓĆ
                            </Button>
                            <Button variant={"contained"} color={"primary"}>
                                <NavLink to={'/Summary'} style={{textDecoration: 'none', color: 'inherit'}}>
                                    REZERWUJ
                                </NavLink>
                            </Button>
                        </div>
                    </Paper>
                </Modal>
                <Paper
                    className={classes.paper}
                >
                    <BackButton path={'/AddingRoomMates'}/>
                    <Typography variant={"h5"}>
                        Twoja grupa
                    </Typography>
                    <Grid container={true} className={classes.userChipsContainer}>
                        <Grid item={true} xs={12} sm={6}>
                            <UserChip
                                faculty={this.state.loggedUser.faculty}
                                name={this.state.loggedUser.name}
                                isLoggedUser={true}
                            />
                        </Grid>
                        {this.props.roomMates.map((user, index) => {
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
                    <Typography variant={"h5"}>
                        Wybierz pokój
                    </Typography>
                    <Grid container={true}>
                        {this.state.rooms.map((room: Room, index: number) => {
                            return (
                                <Grid item={true} xs={12} sm={6} md={4} lg={3} style={{padding: '0.5em'}} key={index}>
                                    <RoomCard onClick={() => this.setState({isModalVisible: true, pickedRoom: room})} desiredSpace={this.props.roomMates.length} room={room}/>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Paper>
            </Grid>
        );
    }

    // o kant dupy rozbić fakowa metoda
    changeOccupancy = () => {
        setTimeout(() => {
            const newRooms = [...this.state.rooms];
            const rand = Math.floor(Math.random() * this.state.rooms.length);
            const changedRoom = this.state.rooms[rand];
            changedRoom.occupancy = Math.floor(Math.random() * changedRoom.capacity);
            newRooms[rand] = changedRoom;
            this.setState({
                rooms: newRooms,
            });
            this.changeOccupancy();
        },Math.random() * 3000 + 600)
    }
}

const ChooseRoomModalWithStyles = withStyles(chooseRoomModalStyles, {withTheme: true})(ChooseRoomModal);
export default connect(mapStateToProps)(ChooseRoomModalWithStyles)
