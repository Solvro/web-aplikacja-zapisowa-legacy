import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TripSettingsForm from '../../components/TripSettingsForm';

class EditRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <TripSettingsForm />
    );
  }
}

export default withRouter(EditRoute);
