import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import SendMessagePanel from '../../components/SendMessagePanel';

class MessageRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <SendMessagePanel />
    );
  }
}

export default withRouter(MessageRoute);
