import React, { Component } from 'react';
import TripSettingsForm from '../components/TripSettingsForm';

export default class CreateTripRoute extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <TripSettingsForm />;
  }
}

