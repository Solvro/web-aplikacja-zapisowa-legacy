import React from 'react';
import { withRouter } from 'react-router-dom';
import TripSettingsForm from '../components/TripSettingsForm';
import { createEvent } from '../store/Api';

const CreateTripRoute = (props) => {
  const { history } = props;

  return (
    <div style={{ width: '50%', margin: '0 auto' }}>
      <TripSettingsForm
        {...props}
        onSubmit={(data) => {
          createEvent(data).then((statusOk) => {
            if (statusOk) {
              history.push('/trips');
            } else {
              alert('ERROR WHILE CREATING EVENT');
            }
          });
        }
      }
      />
    </div>
  );
};


export default withRouter(CreateTripRoute);
