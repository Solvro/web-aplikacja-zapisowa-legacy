import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Route, Switch } from "react-router-dom";
import EditRoute from "./Trip/EditRoute";
import MessageRoute from "./Trip/MessageRoute";
import ParticipantsRoute from "./Trip/ParticipantsRoute";
import RoomsRoute from "./Trip/RoomsRoute";
import OverviewRoute from "./Trip/OverviewRoute";
import TripMenu from "../components/TripMenu";

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
          <Route
            path="/trips/:id(\d+)/edit"
            exact
            component={EditRoute}
          />
          <Route
            path="/trips/:id(\d+)/message"
            exact
            component={MessageRoute}
          />
          <Route
            path="/trips/:id(\d+)/participants"
            exact
            component={ParticipantsRoute}
          />
          <Route
            path="/trips/:id(\d+)/rooms"
            exact
            component={RoomsRoute}
          />
          <Route
            component={OverviewRoute}
          />
        </Switch>
      </main>
    </div>
  );
}

export default withStyles(styles)(ClippedDrawer);
