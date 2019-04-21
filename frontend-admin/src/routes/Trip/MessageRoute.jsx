import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import SendMessagePanel from '../../components/SendMessagePanel';
import { sendMail } from '../../store/Api';
import AlertDialog from '../../components/AlertDialog';
import LoadingModal from '../../components/LoadingModal';
import { Button } from '@material-ui/core';

class MessageRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isAlertOpen: false,
      dialogMessage: '',
    };
    this.toggleDialog = this.toggleDialog.bind(this);
    this.onMessageSent = this.onMessageSent.bind(this);
  }

  onMessageSent(response) {
    this.setState({
      dialogMessage: 'Mail wysłany!',
    });
  }

  toggleDialog() {
    const { isAlertOpen } = this.state;
    this.setState({
      isAlertOpen: !isAlertOpen,
    });
  }

  render() {
    const { isLoading, isAlertOpen, dialogMessage } = this.state;
    const { id: eventName } = this.props.match.params;
    return (
      <>
        <SendMessagePanel
          eventName={eventName}
          handleSend={
            data => sendMail(eventName, data)
              .then(this.onMessageSent)
              .finally(this.toggleDialog)
              .catch(this.onMessageSent)
          }
        />
        <AlertDialog
          title="Wysyłanie wiadomości"
          message={dialogMessage}
          isOpen={isAlertOpen}
        >
          <Button onClick={this.toggleDialog} color="secondary">
            OK
          </Button>
        </AlertDialog>
        <LoadingModal isOpen={isLoading} />
      </>
    );
  }
}

export default withRouter(MessageRoute);
