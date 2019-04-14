import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TableCard from '../../components/TableCard';
import { getParticipantsList } from '../../store/Api';

const columns = ['Imię i nazwisko', 'Wydział', 'Płeć', 'Status'];

class ParticipantsRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: {},
      students: [],
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id: eventName } = match.params;
    const response = await getParticipantsList(eventName);

    const sexMap = {
      M: 'Mężczyzna',
      F: 'Kobieta',
    };
    const statusMap = {
      N: 'Niezapisany',
      Z: 'Zapisany',
    };

    if (response) {
      const { stats, students: preStudents } = response;

      const students = preStudents.map((stud) => {
        const newStudent = {};
        const keys = Object.keys(stud);
        keys.forEach((key, index) => {
          let val = stud[key];
          switch (key) {
            case 'sex':
              val = sexMap[val];
              break;
            case 'status':
              val = statusMap[val];
              break;
            default:
          }
          newStudent[columns[index]] = val;
        });
        return newStudent;
      });

      this.setState({
        stats,
        students,
      });
    }
  }

  render() {
    const { students, stats } = this.state;
    const { students: studentCount, solo_students: soloCount, students_in_rooms: inRoomsCount } = stats;
    return (
      <TableCard
        topic="Uczestnicy"
        columns={columns}
        header={[
          { key: 'Ilość uczestników', value: studentCount },
          { key: 'Zapisani do pokojów', value: inRoomsCount },
          { key: 'Samotnicy', value: soloCount },
        ]}
        rows={students}
      />
    );
  }
}

export default withRouter(ParticipantsRoute);
