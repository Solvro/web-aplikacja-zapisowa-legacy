import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';
import TripSettingsForm, {isFormValid} from '../components/TripSettingsForm';
import { createEvent } from '../store/Api';
import LoadingModal from '../components/LoadingModal';
import AlertDialog from '../components/AlertDialog';

class CreateTripRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isAlertOpen: false,
      dialogMessage: '',
    };
    this.toggleDialog = this.toggleDialog.bind(this);
  }

  toggleDialog() {
    const { isAlertOpen } = this.state;
    this.setState({
      isAlertOpen: !isAlertOpen,
    });
  }

  render() {
    const { history } = this.props;
    const { isLoading, isAlertOpen, dialogMessage } = this.state;
    return (
      <div style={{ width: '50%', margin: '0 auto' }}>
        <TripSettingsForm
          {...this.props}
          render={data => (
            <Grid container alignItems="center" alignContent="center" justify="center" spacing={16}>
              <Grid item xs={6} style={{ textAlign: 'right' }}>
                <Link to="/trips" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="contained"
                    color="default"
                  >
                    Powrót
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={6} style={{ textAlign: 'left' }}>
                <Button
                  disabled={!isFormValid(data)}
                  onClick={() => {
                    this.setState({
                      isLoading: true,
                    });
                    createEvent(data)
                      .then(() => {
                        history.push('/trips');
                      })
                      .catch((err) => {
                        this.setState({
                          isLoading: false,
                          isAlertOpen: true,
                          dialogMessage: err,
                        });
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
        <AlertDialog
          title="Tworzenie wycieczki"
          message={dialogMessage}
          isOpen={isAlertOpen}
        >
          <Button onClick={this.toggleDialog} color="secondary">
            OK
          </Button>
        </AlertDialog>
        <LoadingModal isOpen={isLoading} />
      </div>
    );
  }
}

export default withRouter(CreateTripRoute);
