import React, { Component } from 'react';
import {withRouter} from "react-router-dom";

class EditRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const { match } = this.props;
    return (
      <div>
        EditTrip
        { match.params.id }
      </div>
    );
  }
}

export default withRouter(EditRoute);
