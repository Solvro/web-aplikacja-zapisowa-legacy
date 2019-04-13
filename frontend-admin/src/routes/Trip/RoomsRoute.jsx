import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TableCard from '../../components/TableCard';
import { getRoomsList } from '../../store/Api';

const columns = ['Numer', 'Pojemność', 'Miejsca wolne', 'Miejsca zajęte', 'Rodzaj'];

class RoomsRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room_count: undefined,
      free_rooms: undefined,
      vacancies: undefined,
      rooms: [],
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id: eventName } = match.params;
    const roomsDetails = await getRoomsList(eventName);
    const { rooms } = roomsDetails;

    const renamedFieldsRooms = rooms.map((room) => {
      const newRoom = {};
      const keys = Object.keys(room);
      keys.forEach((key, index) => {
        newRoom[columns[index]] = room[key];
      });
      return newRoom;
    });
    
    roomsDetails.rooms = renamedFieldsRooms;

    this.setState(roomsDetails);
  }

  render() {
    const {
      rooms, room_count: roomCount, free_rooms: freeRoomsCount, vacancies: roomsLeftCount,
    } = this.state;
    return (
      <TableCard
        topic="Pokoje"
        columns={columns}
        header={[
          { key: 'Wszystkich pokoi', value: roomCount },
          { key: 'Wolnych pokoi', value: freeRoomsCount },
          { key: 'Pozostałe miejsca', value: roomsLeftCount },
        ]}
        rows={rooms}
      />
    );
  }
}

export default withRouter(RoomsRoute);
