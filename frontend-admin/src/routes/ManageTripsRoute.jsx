import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import ManageTripScreen from '../screens/ManageTripScreen/ManageTripScreen';
import PrivateRoute from '../components/PrivateRoute';
import TripRoute from './TripRoute';
import CreateTripRoute from './CreateTripRoute';

export default class ManageTripsRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Switch>
        <PrivateRoute
          path="/trips/create"
          exact
          component={CreateTripRoute}
        />
        <PrivateRoute
          path="/trips/:id"
          component={TripRoute}
        />
        <PrivateRoute
          path="/trips"
          component={ManageTripScreen}
        />
      </Switch>
    );
  }
}
