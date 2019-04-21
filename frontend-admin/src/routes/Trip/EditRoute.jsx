import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core';
import TripSettingsForm, {isFormValid} from '../../components/TripSettingsForm';
import { updateEvent, getEventDetails } from '../../store/Api';
import AlertDialog from '../../components/AlertDialog';
import LoadingModal from '../../components/LoadingModal';

class EditRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isAlertOpen: false,
      dialogMessage: '',
    };
    this.toggleDialog = this.toggleDialog.bind(this);
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const details = await getEventDetails(id);
    if (details) {
      this.setState({
        ...details,
        isLoading: false,
      });
    }
  }

  toggleDialog() {
    const { isAlertOpen } = this.state;
    this.setState({
      isAlertOpen: !isAlertOpen,
    });
  }

  render() {
    const { match, ...restProps } = this.props;
    const {
      isLoading, dialogMessage, isAlertOpen, ...restState
    } = this.state;
    const { id: eventName } = match.params;
    return (
      <div style={{ width: '50%', margin: '0 auto' }}>
        {!isLoading && (
          <TripSettingsForm
            {...restProps}
            defaultState={restState}
            eventNameChangingDisabled
            render={data => (
              <Grid container alignItems="center" alignContent="center" justify="center" spacing={16}>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                  <Button
                    disabled={!isFormValid(data, true)}
                    onClick={() => {
                      updateEvent(eventName, data).then((statusOk) => {
                        let msg = '';
                        if (statusOk) {
                          msg = 'Wycieczka zaktualizowana';
                        } else {
                          msg = 'Wystąpił błąd podczas edycji wycieczki';
                        }
                        this.setState({
                          dialogMessage: msg,
                          isAlertOpen: true,
                        });
                      });
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Zapisz edycję
                  </Button>
                </Grid>
              </Grid>
            )}
          />
        )}
        <AlertDialog
          title="Edycja wycieczki"
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

export default withRouter(EditRoute);
