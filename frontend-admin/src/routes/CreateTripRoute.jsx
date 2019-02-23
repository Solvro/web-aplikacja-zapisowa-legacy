import React, { Component } from 'react';
import ManageTripScreen from '../screens/ManageTripScreen/ManageTripScreen';

export default class CreateTripRoute extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ManageTripScreen />
    );
  }
}
