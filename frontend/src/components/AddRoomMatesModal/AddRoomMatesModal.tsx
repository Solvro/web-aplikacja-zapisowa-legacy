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
import {initFetchRoomMate, removeError, removeRoomMate} from "../../store/RoomMate/actions";
import {UserChip} from "../UserChip/UserChip";
import {GroupAdd} from "@material-ui/icons";
import {NavLink} from "react-router-dom";
import ErrorDisplay from "../ErrorDisplay";

type AddRoomMatesModalProps = {
    status: string;
    isFetching: boolean;
    roomMates: RoomMate[];
    errors: ApplicationError[];
    addRoomMate(login: string): void;
    removeRoomMate(login: string): void;
    removeError(id: number): void;
}

const mapStateToProps = (state: ApplicationState): Partial<AddRoomMatesModalProps> => {
    return {
        roomMates: state.roomMateState.roomMates,
        isFetching: state.roomMateState.fetching,
        status: state.roomMateState.status,
        errors: state.roomMateState.errors,
    }
};
const mapDispatchToProps = (dispatch: Dispatch<ApplicationState>): Partial<AddRoomMatesModalProps> => {
    return {
        addRoomMate(login) {
            initFetchRoomMate(login)(dispatch);
        },
        removeRoomMate(login) {
            dispatch(removeRoomMate(login));
        },
        removeError(id) {
            dispatch(removeError(id));
        }
    }
};

class AddRoomMatesModal extends React.Component<WithStyles<typeof addRoomMatesModalStyles> & AddRoomMatesModalProps> {
    state = {
        user: {
            name: "Michał"
        },
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
        this.props.addRoomMate(this.state.inputCode);
        this.setState({inputCode: ""});
    };

    public render(): React.ReactNode {
        const {classes, removeError, errors, isFetching, roomMates} = this.props;
        return (
            <div className={classes.container}>
                <ErrorDisplay removeError={removeError} errors={errors}/>
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
                            Cześć {this.state.user.name}!
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
                                            <GroupAdd />
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
                                <Grid item={true} sm={6}>
                                    <UserChip key={index} onDelete={() => this.props.removeRoomMate(roomMate.login)} faculty={roomMate.faculty} name={roomMate.name}/>
                                </Grid>
                            ))}
                        </Grid>
                        <div className={classes.buttonWrapper}>
                            <Button
                                className={classes.button}
                                variant={"contained"}
                                color={"default"}
                            >
                                <NavLink to={'/RoomBooking'} style={{textDecoration: 'none', color: 'inherit'}}>
                                    Utwórz grupę
                                </NavLink>
                            </Button>
                            <Button variant={"contained"} color={"primary"}>
                                Jestem sam
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
