import React, { Component } from 'react';
import {withRouter} from "react-router-dom";

class MessageRoute extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const { match } = this.props;
    return (
      <div>
        Message
        { match.params.id }
      </div>
    );
  }
}

export default withRouter(MessageRoute);
