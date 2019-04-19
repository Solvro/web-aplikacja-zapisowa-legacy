import * as React from 'react';
import {Button, createStyles, withStyles, WithStyles} from "@material-ui/core";
import {ApplicationState} from "../store";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router";

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

type LogoutButtonProps = {
    isVisible: boolean
} & WithStyles<typeof logoutButtonStyles> & RouteComponentProps<{}>;

const LogoutButton = (props: LogoutButtonProps) => {
    const { classes, isVisible } = props;

    return (
        <div
            className={classes.buttonContainer}
        >
            <Button
                style={{display: isVisible ? 'block' : 'none'}}
                onClick={handleLogoutButtonClick(props.history.push)}
                color={"primary"}
            >
                Wyloguj
            </Button>
        </div>
    );

};

const handleLogoutButtonClick = (push: ((path: string) => void)) => () => {
    localStorage.clear();
    push('/');
};

export default connect(mapStateToProps)(
    withRouter(
        withStyles(logoutButtonStyles)(LogoutButton)
    )
);
