import * as React from 'react';
import {Button, createStyles, withStyles, WithStyles} from "@material-ui/core";
import {ApplicationState} from "../store";
import {connect, Dispatch} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router";
import {signOut} from "../store/RoomMate/actions";

const logoutButtonStyles = createStyles({
    buttonContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
    }
});

const mapStateToProps = (state: ApplicationState) => ({
    isVisible: !!state.roomMateState.user,
});

const mapDispatchToProps = (dispatch: Dispatch<ApplicationState>) => ({
    signOut: () => { dispatch(signOut) }
});

type LogoutButtonProps = {
    isVisible: boolean,
    signOut: () => void,
} & WithStyles<typeof logoutButtonStyles> & RouteComponentProps<{}>;

const LogoutButton = (props: LogoutButtonProps) => {
    const { classes, isVisible, signOut, history } = props;

    const handleLogoutButtonClick = () => {
        localStorage.clear();
        signOut();
        history.push('/');
    };

    return (
        <div
            className={classes.buttonContainer}
        >
            <Button
                style={{display: isVisible ? 'block' : 'none'}}
                onClick={handleLogoutButtonClick}
                color={"primary"}
            >
                Wyloguj
            </Button>
        </div>
    );

};

export default connect(mapStateToProps, mapDispatchToProps)(
    withRouter(
        withStyles(logoutButtonStyles)(LogoutButton)
    )
);
