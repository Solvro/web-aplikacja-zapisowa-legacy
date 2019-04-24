import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Switch } from "react-router-dom";
import EditRoute from "./Trip/EditRoute";
import MessageRoute from "./Trip/MessageRoute";
import ParticipantsRoute from "./Trip/ParticipantsRoute";
import RoomsRoute from "./Trip/RoomsRoute";
import OverviewRoute from "./Trip/OverviewRoute";
import TripMenu from "../components/TripMenu";
import PrivateRoute from '../components/PrivateRoute';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

function ClippedDrawer(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <TripMenu />
      <main className={classes.content}>
        <Switch>
          <PrivateRoute
            path="/trips/:id/edit"
            component={EditRoute}
          />
          <PrivateRoute
            path="/trips/:id/message"
            exact
            component={MessageRoute}
          />
          <PrivateRoute
            path="/trips/:id/participants"
            exact
            component={ParticipantsRoute}
          />
          <PrivateRoute
            path="/trips/:id/rooms"
            exact
            component={RoomsRoute}
          />
          <PrivateRoute path={`${props.match.path}`}
            component={OverviewRoute}
          />
        </Switch>
      </main>
    </div>
  );
}

export default withStyles(styles)(ClippedDrawer);
