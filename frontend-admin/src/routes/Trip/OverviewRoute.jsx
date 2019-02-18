import React, { Component } from 'react';
import {withRouter} from "react-router-dom";

class OverviewRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const { match } = this.props;
    return (
      <div>
        Overview
        { match.params.id }
      </div>
    );
  }
}

export default withRouter(OverviewRoute);
