import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import SendMessagePanel from '../../components/SendMessagePanel';
import { sendMail } from "../../store/Api";

class MessageRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const { id: eventName } = this.props.match.params;
    console.log(eventName)
    return (
      <SendMessagePanel eventName={eventName} handleSend={(data) => sendMail(eventName, data)}/>
    );
  }
}

export default withRouter(MessageRoute);
