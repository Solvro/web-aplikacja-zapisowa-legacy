import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreateTripRoute from './routes/CreateTripRoute';
import LoginRoute from './routes/LoginRoute';
import NoMatchRoute from './routes/NoMatchRoute';
import TripRoute from './routes/TripRoute';
import ManageTripsRoute from './routes/ManageTripsRoute';
import TripAppBar from "./components/TripAppBar";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Route path="/trips">
            <>
              <TripAppBar />
              <Switch>
                <Route
                  path="/trips/:id"
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
          <Route component={() => NoMatchRoute} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
