import * as React from 'react';
import {Button, Grid, Modal, Paper, Typography, withStyles, WithStyles} from "@material-ui/core";
import {chooseRoomModalStyles} from "./ChooseRoomModalStyles";
import {UserChip} from "../UserChip/UserChip";
import {Room, RoomCard} from "./RoomCard";
import {ApplicationState} from "../../store";
import {RoomMate} from "../../store/RoomMate/types";
import {connect} from "react-redux";
import BackButton from "../BackButton";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {APIurl, enrollStudentsInRoom} from "../../store/api";

type ChooseRoomModalProps = {
    roomMates: RoomMate[];
    user: RoomMate;
} & RouteComponentProps<{}>;

type WebSocketRoom = {
    number: number;
    vacancies: number;
    max_capacity: number;
}

const mapStateToProps = (state: ApplicationState): Partial<ChooseRoomModalProps> => {
    return {
        roomMates: state.roomMateState.roomMates,
        user: state.roomMateState.user,
    }
};

class ChooseRoomModal extends React.Component<WithStyles<typeof chooseRoomModalStyles> & ChooseRoomModalProps> {
    state = {
        rooms: [],
        isModalVisible: false,
        pickedRoom: {
            number: 0,
            capacity: 0,
            occupancy: 0,
        },
    };

    public componentDidMount() {
        const wb = new WebSocket(`ws://${APIurl}/ws/${this.props.user.event}/rooms/`);
        wb.onmessage = (message: MessageEvent) => {
            try {
                const data = JSON.parse(message.data);
                if (data.rooms) {
                    const rooms: Room[] = data.rooms
                        .map((room: WebSocketRoom): Room => ({
                            capacity: room.max_capacity,
                            number: room.number,
                            occupancy: room.max_capacity - room.vacancies
                        }));

                    this.setState({rooms});
                } else if (data.room) {
                    const newRoom: Room = {
                        capacity: data.room.max_capacity,
                        number: data.room.number,
                        occupancy: data.room.max_capacity - data.room.vacancies
                    };

                    this.setState({
                        rooms: this.state.rooms.map((room: Room) =>
                            (room.number !== newRoom.number) ? room : newRoom)
                    }, this.updatePickedRoom);
                }
            } catch (error) {
                console.error(error);
            }
        };
    }

    public render(): React.ReactNode {
        const {classes, roomMates, user, history} = this.props;

        if (!roomMates.length) {
            history.replace('/AddRoomMates');
            return null;
        } else return (
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
                            <Button
                                variant={"contained"}
                                color={"primary"}
                                onClick={this.enrollStudentsInRoom}
                            >
                                REZERWUJ
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
                                faculty={user.faculty}
                                name={user.name}
                                isLoggedUser={true}
                            />
                        </Grid>
                        {roomMates.map((user, index) => {
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
                        {this.state.rooms
                            .sort((r1: Room, r2: Room) => r1.number - r2.number)
                            .map((room: Room, index: number) => {
                                return (
                                    <Grid item={true} xs={12} sm={6} md={4} lg={3} style={{padding: '0.5em'}}
                                          key={index}>
                                        <RoomCard
                                            onClick={() => this.setState({isModalVisible: true, pickedRoom: room})}
                                            desiredSpace={roomMates.length} room={room}/>
                                    </Grid>
                                );
                            })}
                    </Grid>
                </Paper>
            </Grid>
        );
    }

    private enrollStudentsInRoom = async () => {
        try {
            const {roomMates, user, history} = this.props;
            const {pickedRoom} = this.state;
            const result = await enrollStudentsInRoom(roomMates, pickedRoom.number, user.event);
            const resultBody = await result.json();
            console.log(result, 'result');
            if (result.status === 200) {
                history.replace('/Summary', {roomNumber: pickedRoom.number, roomMates, user});
            } else {
                console.log(resultBody);
            }
        } catch (e) {
            throw e;
        }
    };

    private updatePickedRoom = () => {
        const { pickedRoom } = this.state;
        if ( this.props.roomMates.length + 1 >= pickedRoom.capacity - pickedRoom.occupancy) {
            this.setState({
                isModalVisible: false,
            })
        }
    }
}

const ChooseRoomModalWithStyles = withStyles(chooseRoomModalStyles, {withTheme: true})(ChooseRoomModal);
export default connect(mapStateToProps)(withRouter(ChooseRoomModalWithStyles))
