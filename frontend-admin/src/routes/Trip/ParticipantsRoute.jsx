import React, { Component } from 'react';
import {withRouter} from "react-router-dom";

class ParticipantsRoute extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const { match } = this.props;
    return (
      <div>
        Participants
        { match.params.id }
      </div>
    );
  }
}

export default withRouter(ParticipantsRoute);
