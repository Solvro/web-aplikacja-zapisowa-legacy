import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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
        <TableCard
          topic="Uczestnicy"
          columns={['Numer', 'Pojemność', 'Miejsca wolne', 'Miejsca zajęte', 'Rodzaj']}
          header={[{ key: 'dasdssa', value: 50 }, { key: 'dasda', value: 50 }, { key: 'dasdddsadaa', value: 30 }, { key: 'bbb', value: 501 }]}
          rows={[
            { id: 10, capacity: 159, freeSpots: 6.0, busySpots: 6, sex: 'Zenski'},
            { id: 10, capacity: 159, freeSpots: 6.0, busySpots: 6, sex: 'Zenski'},
            { id: 10, capacity: 159, freeSpots: 6.0, busySpots: 6, sex: 'Zenski'},
            { id: 10, capacity: 159, freeSpots: 6.0, busySpots: 6, sex: 'Zenski'},
            { id: 10, capacity: 159, freeSpots: 6.0, busySpots: 6, sex: 'Zenski'},
            { id: 10, capacity: 159, freeSpots: 6.0, busySpots: 6, sex: 'Zenski'},
            { id: 10, capacity: 159, freeSpots: 6.0, busySpots: 6, sex: 'Zenski'},
          ]}
        />
      </>
    );
  }
}

export default withRouter(ParticipantsRoute);
