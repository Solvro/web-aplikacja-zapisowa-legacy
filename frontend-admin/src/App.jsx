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


const styles = theme => ({
  toolbar: theme.mixins.toolbar,
});

const App = ({ classes }) => (
  <React.Fragment>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/trips">
            <>
              <TripAppBar />
              <div className={classes.toolbar} />
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
          <Route
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
