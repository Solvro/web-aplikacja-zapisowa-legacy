import React, { Component } from 'react';
import {withRouter} from "react-router-dom";

class RoomsRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const { match } = this.props;
    return (
      <div>
        Rooms
        { match.params.id }
      </div>
    );
  }
}

export default withRouter(RoomsRoute);
