import * as React from 'react';
import {Grid, Paper, Typography, withStyles, WithStyles} from "@material-ui/core";
import {chooseRoomModalStyles} from "./ChooseRoomModalStyles";

class UserFormRoute extends React.Component<WithStyles<typeof chooseRoomModalStyles>> {
    public render(): React.ReactNode {
        const {classes} = this.props;
        return (
            <Grid
                container={true}
                item={true}
                className={classes.paperContainer}
                xl={7}
                lg={8}
                md={9}
                xs={10}
            >
                <Paper
                    className={classes.paper}
                >
                    <Typography variant={"h4"} color={"textSecondary"}>
                        Twoja grupa
                    </Typography>
                    <Typography variant={"h4"} color={"textSecondary"}>
                        Wybierz pokój
                    </Typography>
                </Paper>
            </Grid>
        );
    }
}

export default withStyles(chooseRoomModalStyles, {withTheme: true})(UserFormRoute);