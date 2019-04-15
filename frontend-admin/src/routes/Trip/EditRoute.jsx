import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TripSettingsForm from '../../components/TripSettingsForm';
import { updateEvent, getEventDetails } from "../../store/Api";

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
          onSubmit={(data) => {
            updateEvent(eventName, data).then((statusOk) => {
              if (statusOk) {
                alert('Wycieczka zaktualizowana');
              } else {
                alert('ERROR WHILE UPDATING EVENT');
              }
            });
          }
          }
        />}
      </div>
    );
  }
}

export default withRouter(EditRoute);
