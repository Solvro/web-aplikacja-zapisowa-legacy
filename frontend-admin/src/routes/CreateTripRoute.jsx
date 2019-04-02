import React, { Component } from 'react';
import TripSettingsForm from '../components/TripSettingsForm';
import { handleCreateTrip } from '../store/Api';

export default class CreateTripRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <h1>Stwórz wycieczkę</h1>
        <TripSettingsForm onSubmit={handleCreateTrip} />
      </>
    );
  }
}
