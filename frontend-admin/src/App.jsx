import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import 'typeface-roboto';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import theme from './theme';
import LoginRoute from './routes/LoginRoute';
import ManageTripsRoute from './routes/ManageTripsRoute';
import TripAppBar from './components/TripAppBar';
import PrivateRoute from './components/PrivateRoute';


const styles = theme => ({
  toolbar: theme.mixins.toolbar,
});

const renderContent = classes => (
  <>
    <TripAppBar />
    <div className={classes.toolbar} />
    <PrivateRoute
      path="/trips"
      component={ManageTripsRoute}
    />
  </>
);

const App = ({ classes }) => (
  <React.Fragment>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>

      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            component={LoginRoute}
          />

          <PrivateRoute
            path="/"
            component={() => renderContent(classes)}
          />

        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  </React.Fragment>
);

export default withStyles(styles)(App);
