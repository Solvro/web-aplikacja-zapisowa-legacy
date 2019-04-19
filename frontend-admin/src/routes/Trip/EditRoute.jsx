import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import TripSettingsForm from '../../components/TripSettingsForm';
import { updateEvent, getEventDetails } from "../../store/Api";
import { Grid, Button } from '@material-ui/core';

class EditRoute extends Component {
  state = {
    isLoading: true,
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const details = await getEventDetails(id);
    if (details) {
      console.log(details)
      this.setState({
        ...details,
        isLoading: false,
      });
    }
  }

  render() {
    const { match, ...restProps } = this.props;
    const { isLoading, ...restState } = this.state;
    const { id: eventName } = match.params;
    return (
      <div style={{ width: '50%', margin: '0 auto' }}>
        {!isLoading && <TripSettingsForm
          {...restProps}
          defaultState={restState}
          eventNameChangingDisabled={true}
          render={data => (
            <Grid container alignItems="center" alignContent="center" justify="center" spacing={16}>
              <Grid item xs={12} style={{textAlign: 'center'}}>
                <Button
                  onClick={() => {
                    updateEvent(eventName, data).then((statusOk) => {
                      if (statusOk) {
                        alert('Wycieczka zaktualizowana');
                      } else {
                        alert('ERROR WHILE UPDATING EVENT');
                      }
                    });
                  }}
                  variant="contained"
                  color="primary"
                >
                  Edytuj
                </Button>
              </Grid>
            </Grid>
          )}
        />}
      </div>
    );
  }
}

export default withRouter(EditRoute);
