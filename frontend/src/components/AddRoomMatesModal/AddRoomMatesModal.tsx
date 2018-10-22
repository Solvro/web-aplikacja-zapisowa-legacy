import * as React from "react";
import {
    Button, CircularProgress,
    Grid,
    IconButton,
    InputAdornment,
    Paper, Snackbar,
    TextField,
    Typography,
    withStyles,
    WithStyles
} from "@material-ui/core";
import {addRoomMatesModalStyles} from "./AddRoomMatesModalStyles";
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "../../store";
import {RoomMate} from "../../store/RoomMate/types";
import {initFetchRoomMate, removeRoomMate} from "../../store/RoomMate/actions";
import {UserChip} from "../UserChip/UserChip";
import {Close, GroupAdd} from "@material-ui/icons";
import {NavLink} from "react-router-dom";

type AddRoomMatesModalProps = {
    status: string;
    isFetching: boolean;
    roomMates: RoomMate[];
    addRoomMate(login: string): void;
    removeRoomMate(login: string): void;
}

const mapStateToProps = (state: ApplicationState): Partial<AddRoomMatesModalProps> => {
    return {roomMates: state.roomMateState.roomMates, isFetching: state.roomMateState.fetching, status: state.roomMateState.status}
};
const mapDispatchToProps = (dispatch: Dispatch<ApplicationState>): Partial<AddRoomMatesModalProps> => {
    return {
        addRoomMate(login: string) {
            initFetchRoomMate(login)(dispatch);
        },
        removeRoomMate(login) {
            dispatch(removeRoomMate(login));
        },
    }
};

class AddRoomMatesModal extends React.Component<WithStyles<typeof addRoomMatesModalStyles> & AddRoomMatesModalProps> {
    state = {
        user: {
            name: "Michał"
        },
        inputCode: "",
        status: "",
        snackbarOpen: false,
    };

    errorSnackBar = () => (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={this.state.snackbarOpen}
            autoHideDuration={3000}
            onClose={() => this.setState({snackbarOpen: false})}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">Użytkownik o podanym loginie nie istnieje</span>}
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={() => this.setState({snackbarOpen: false})}
                >
                    <Close />
                </IconButton>,
            ]}
        />
    );

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

    static getDerivedStateFromProps(props: AddRoomMatesModalProps, state: any) {
        console.log('pop');
        return {status: props.status, snackbarOpen: state.status !== props.status && props.status === 'failure'};
    }

    public render(): React.ReactNode {
        const {classes} = this.props;
        return (
            <div className={classes.container}>
                {this.errorSnackBar()}
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
                                        {this.props.isFetching && <CircularProgress
                                            size={24}
                                            style={{position: 'absolute', right: '-1.5em'}}
                                        />}
                                    </InputAdornment>
                                )
                            }}
                        />
                        <Grid container={true} className={classes.userChipsContainer}>
                            {this.props.roomMates.map((roomMate: RoomMate, index: number) => (
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
