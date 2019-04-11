import * as React from "react";
import {
    Button,
    CircularProgress,
    Grid,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    Typography,
    withStyles,
    WithStyles
} from "@material-ui/core";
import {addRoomMatesModalStyles} from "./AddRoomMatesModalStyles";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "../../store";
import {ApplicationError, RoomMate} from "../../store/RoomMate/types";
import {initFetchRoomMate, removeRoomMate} from "../../store/RoomMate/actions";
import {UserChip} from "../UserChip/UserChip";
import {GroupAdd} from "@material-ui/icons";
import {NavLink} from "react-router-dom";

type AddRoomMatesModalProps = {
    status: string;
    isFetching: boolean;
    roomMates: RoomMate[];
    errors: ApplicationError[];
    user: RoomMate;
    addRoomMate(login: string, eventName: string): void;
    removeRoomMate(login: string): void;
}

const mapStateToProps = (state: ApplicationState): Partial<AddRoomMatesModalProps> => {
    return {
        roomMates: state.roomMateState.roomMates,
        isFetching: state.roomMateState.fetching,
        status: state.roomMateState.status,
        errors: state.roomMateState.errors,
        user: state.roomMateState.user,
    }
};
const mapDispatchToProps = (dispatch: Dispatch<ApplicationState>): Partial<AddRoomMatesModalProps> => {
    return {
        addRoomMate(login, eventName) {
            initFetchRoomMate(login, eventName)(dispatch);
        },
        removeRoomMate(login) {
            dispatch(removeRoomMate(login));
        },
    }
};

class AddRoomMatesModal extends React.Component<WithStyles<typeof addRoomMatesModalStyles> & AddRoomMatesModalProps> {
    state = {
        inputCode: "",
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            inputCode: event.target.value
        });
    };

    handleEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") {
            this.addUserByLogin();
        }
    };

    handleClickGroupIcon = (event: React.MouseEvent<HTMLDivElement>) => {
        this.addUserByLogin();
    };

    addUserByLogin = () => {
        this.props.addRoomMate(this.state.inputCode, this.props.user.event);
        this.setState({inputCode: ""});
    };

    public render(): React.ReactNode {
        const {removeRoomMate, classes, isFetching, roomMates, user} = this.props;
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
                        <Typography
                            align={"left"}
                            gutterBottom={true}
                            variant={"h5"}
                            color={"inherit"}
                        >
                            Cześć {user.name}!
                        </Typography>
                        <Typography
                            className={classes.description}
                            align={"left"}
                            variant={"body1"}
                            color={"inherit"}
                        >
                            Jeśli chcesz być w pokoju z wybranymi osobami, potrzebujemy waszej obupólnej zgody. Dodaj do
                            grupy swoich znajomych za pomocy kodów identyfikujących, które zostały wysłane na wasze
                            maile. Wybierz opcję "jestem sam" jeśli nie ma dla Ciebie różnicy z kim będziesz w pokoju,
                            albo po prostu chcesz poznać nowych ludzi.
                        </Typography>
                        <TextField
                            variant={"standard"}
                            label={"Kod"}
                            onChange={this.handleChange}
                            value={this.state.inputCode}
                            onKeyDown={this.handleEnter}
                            className={classes.codeInput}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position={"end"}>
                                        <IconButton onClick={this.handleClickGroupIcon}>
                                            <GroupAdd/>
                                        </IconButton>
                                        {isFetching && <CircularProgress
                                            size={24}
                                            style={{position: 'absolute', right: '-1.5em'}}
                                        />}
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Grid container={true} className={classes.userChipsContainer}>
                            {roomMates.map((roomMate: RoomMate, index: number) => (
                                <Grid key={index} item={true} sm={6}>
                                    <UserChip key={index} onDelete={() => removeRoomMate(roomMate.login)}
                                              faculty={roomMate.faculty} name={roomMate.name}/>
                                </Grid>
                            ))}
                        </Grid>
                        <div className={classes.buttonWrapper}>
                            <Button
                                className={classes.button}
                                variant={"contained"}
                                color={roomMates.length > 0 ? "primary" : "default"}
                                disabled={roomMates.length === 0}
                            >
                                <NavLink to={'/RoomBooking'} style={{textDecoration: 'none', color: 'inherit'}}>
                                    Utwórz grupę
                                </NavLink>
                            </Button>
                            <Button
                                variant={"contained"}
                                color={roomMates.length === 0 ? "primary" : "default"}
                                disabled={roomMates.length > 0}
                            >
                                <NavLink to={'/Summary'} style={{textDecoration: 'none', color: 'inherit'}}>
                                    Jestem sam
                                </NavLink>
                            </Button>
                        </div>
                    </Paper>
                </Grid>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)((withStyles(addRoomMatesModalStyles, {withTheme: true})(
    AddRoomMatesModal
)));
