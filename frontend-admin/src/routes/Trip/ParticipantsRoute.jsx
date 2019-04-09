import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import TableCard from '../../components/TableCard';

class ParticipantsRoute extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const { match } = this.props;
    return (
      <>
        <TableCard/>
      </>
    );
  }
}

export default withRouter(ParticipantsRoute);
