import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import 'typeface-roboto';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import theme from './theme';
import CreateTripRoute from './routes/CreateTripRoute';
import TableRoute from './routes/TableRoute';
import LoginRoute from './routes/LoginRoute';
import NoMatchRoute from './routes/NoMatchRoute';
import TripRoute from './routes/TripRoute';
import ManageTripsRoute from './routes/ManageTripsRoute';
import TripAppBar from './components/TripAppBar';
import PrivateRoute from './components/PrivateRoute';


const styles = theme => ({
  toolbar: theme.mixins.toolbar,
});

const App = ({ classes }) => (
  <React.Fragment>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <TripAppBar />
      <div className={classes.toolbar} />
      <BrowserRouter>
        <Switch>
          <PrivateRoute
            path="/trips/:id(\d+)"
            component={TripRoute}
          />
          <PrivateRoute
            path="/trips/create"
            exact
            component={CreateTripRoute}
          />
          <PrivateRoute
            path="/trips"
            exact
            component={ManageTripsRoute}
          />
          <Route
            path="/login"
            component={LoginRoute}
          />
          <PrivateRoute
            path="/table"
            component={TableRoute}
          />
          <Route component={NoMatchRoute} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  </React.Fragment>
);

export default withStyles(styles)(App);
