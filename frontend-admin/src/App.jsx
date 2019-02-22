import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'typeface-roboto';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {withStyles} from "@material-ui/core";
import CreateTripRoute from './routes/CreateTripRoute';
import LoginRoute from './routes/LoginRoute';
import NoMatchRoute from './routes/NoMatchRoute';
import TripRoute from './routes/TripRoute';
import ManageTripsRoute from './routes/ManageTripsRoute';
import TripAppBar from "./components/TripAppBar";

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
});

const App = ({classes}) => (
  <React.Fragment>
    <CssBaseline/>
    <BrowserRouter>
      <Switch>
        <Route path="/trips">
          <>
            <TripAppBar/>
            <div className={classes.toolbar}/>
            <Switch>
              <Route
                path="/trips/:id(\d+)"
                component={TripRoute}
              />
              <Route
                path="/trips/create"
                exact
                component={CreateTripRoute}
              />
              <Route
                path="/trips"
                exact
                component={ManageTripsRoute}
              />
            </Switch>
          </>
        </Route>
        <Route
          path="/login"
          component={LoginRoute}
        />
        <Route component={NoMatchRoute}/>
      </Switch>
    </BrowserRouter>
  </React.Fragment>
);

export default withStyles(styles)(App);
