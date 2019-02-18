import * as React from 'react';
import {Grid, withStyles, WithStyles} from "@material-ui/core";
import {userFormRouteStyles} from "./UserFormRouteStyles";
import {Route} from "react-router";
import ChooseRoomModal from "../ChooseRoomModal/ChooseRoomModal";

class UserFormRoute extends React.Component<WithStyles<typeof userFormRouteStyles>> {
    public render(): React.ReactNode {
        const { classes } = this.props;
        return (
            <Grid container={true} className={classes.mainContainer}>
                <Route component={ChooseRoomModal}/>
            </Grid>
        );
    }
}

export default withStyles(userFormRouteStyles, {withTheme: true})(UserFormRoute);