import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';
import TripSettingsForm from '../components/TripSettingsForm';
import { createEvent } from '../store/Api';

const CreateTripRoute = (props) => {
  const { history } = props;

  return (
    <div style={{ width: '50%', margin: '0 auto' }}>
      <TripSettingsForm
        {...props}
        render={data => (
          <Grid container alignItems="center" alignContent="center" justify="center" spacing={16}>
            <Grid item xs={6} style={{ textAlign: 'right' }}>
              <Link to="/trips">
                <Button
                  variant="contained"
                  color="default"
                >
                  Powrót
                </Button>
              </Link>
            </Grid>
            <Grid item xs={6} style={{textAlign: 'left'}}>
              <Button
                onClick={() => {
                  createEvent(data).then((statusOk) => {
                    if (statusOk) {
                      history.push('/trips');
                    } else {
                      alert('ERROR WHILE CREATING EVENT');
                    }
                  });
                }}
                variant="contained"
                color="primary"
              >
                Stwórz
              </Button>
            </Grid>
          </Grid>
        )}
      />
    </div>
  );
};


export default withRouter(CreateTripRoute);
