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
        <TableCard topic="Uczestnicy" header={[{key: 'dasda', value: 50}, {key: 'dasdddsadaa', value: 30}, {key: 'bbb', value: 501} ]} />
      </>
    );
  }
}

export default withRouter(ParticipantsRoute);
