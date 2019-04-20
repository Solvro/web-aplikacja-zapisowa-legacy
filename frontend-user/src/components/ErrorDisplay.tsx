import {createStyles, Icon, IconButton, Slide, SnackbarContent, Theme, withStyles, WithStyles} from "@material-ui/core";
import * as React from "react";
import {Close} from "@material-ui/icons";
import {ApplicationError} from "../store/RoomMate/types";
import {ApplicationState} from "../store";
import {connect, Dispatch} from "react-redux";
import {clearErrors, removeError} from "../store/RoomMate/actions";
import {RouteComponentProps, withRouter} from "react-router";

const errorDisplayStyles = (theme: Theme) => createStyles({
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    icon: {
        fontSize: 20,
        opacity: 0.9,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    errorsContainer: {
        position: 'absolute',
        left: theme.spacing.unit * 2,
        bottom: theme.spacing.unit * 2,
        display: 'flex',
        flexDirection: 'column-reverse',
        '& > div': {
            marginTop: theme.spacing.unit * 2,
        },
        zIndex: 9999
    },
});

type ErrorDisplayProps = {
    errors: ApplicationError[];
    removeError: (id: number) => void;
    clearErrors: () => void;
} & RouteComponentProps<{}> & WithStyles<typeof errorDisplayStyles>;

const mapStateToProps = (state: ApplicationState): Partial<ErrorDisplayProps> => ({
    errors: state.roomMateState.errors
});

const mapDispatchToProps = (dispatch: Dispatch<ApplicationState>): Partial<ErrorDisplayProps> => ({
    removeError: id => dispatch(removeError(id)),
    clearErrors: () => dispatch(clearErrors)
});

class ErrorDisplay extends React.PureComponent<ErrorDisplayProps> {
    componentDidMount(): void {
        const { history, clearErrors} = this.props;
        history.listen(() => {
            clearErrors();
        })
    }

    render() {
        const {classes, errors, removeError} = this.props;
        return (
            <div className={classes.errorsContainer}>
                {errors.map(error => (
                    <Slide key={error.id} direction={"right"} in={true} mountOnEnter={true} unmountOnExit={true}>
                        <SnackbarContent
                            key={error.id}
                            className={classes.error}
                            message={
                                <span className={classes.message}>
                        <Icon className={classes.icon}/>
                                    {error.message}
                        </span>
                            }
                            action={[
                                <IconButton
                                    key="close"
                                    aria-label="Close"
                                    color="inherit"
                                    onClick={() => removeError(error.id)}
                                >
                                    <Close className={classes.icon}/>
                                </IconButton>,
                            ]}
                        />
                    </Slide>
                ))}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(errorDisplayStyles)(
        withRouter(ErrorDisplay)
    )
);




