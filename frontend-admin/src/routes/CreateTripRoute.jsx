import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TripSettingsForm from '../components/TripSettingsForm';
import { handleCreateTrip } from '../store/Api';

class CreateTripRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { history } = this.props;
    return (
      <TripSettingsForm
        {...this.props}
        onSubmit={(data) => {
          handleCreateTrip(data).then((statusOk) => {
            if (statusOk) {
              history.push('/trips');
            } else {
              alert('ERROR WHILE CREATING EVENT');
            }
          });
        }
      }
      />
    );
  }
}

export default withRouter(CreateTripRoute);
