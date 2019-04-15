import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TableCard from '../../components/TableCard';
import { Button } from '@material-ui/core';
import EditParticipantDialog from '../../components/EditParticipantDialog';
import { getParticipantsList, removeParticipant } from '../../store/Api';

const columns = ['Imię i nazwisko', 'Wydział', 'Płeć', 'Status', 'Index', 'Akcja'];

class ParticipantsRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: null,
      isDialogOpen: false,
      stats: {},
      students: [],
      dialogStudent: {},
    };
  }

  toggleDialog = () => {
    this.setState({
      isDialogOpen: !this.state.isDialogOpen,
    })
  }

  handleCloseDialog = (data) => {
    this.toggleDialog();
  }

  prepareDataForDynamicTable(preStudents) {
    const sexMap = {
      M: 'Mężczyzna',
      F: 'Kobieta',
    };
    const statusMap = {
      N: 'Niezapisany',
      Z: 'Zapisany',
    };

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

    return students;
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id: eventName } = match.params;
    const response = await getParticipantsList(eventName);
    const { stats, students } = response;

    this.setState({
      stats,
      students,
      dialogStudent: students[0],
      eventName
    });
  }

  deleteParticipants = (participantInfo, eventName) => {
    const decision = prompt(`Czy jesteś pewien, że chcesz usunąć ${participantInfo['Imię i nazwisko'].props.children.props.children}? Wpisz tak, aby potwierdzić.`);
    if(decision === 'tak'){
      removeParticipant(eventName, participantInfo);
    }
  };

  render() {
    const { students, stats, isDialogOpen, dialogStudent, eventName } = this.state;
    const { students: studentCount, solo_students: soloCount, students_in_rooms: inRoomsCount } = stats;
    return (
      <>
        <Button variant="outlined" color="primary" onClick={this.toggleDialog}>
          Open form dialog
        </Button>
        {isDialogOpen && <EditParticipantDialog
          fullName={dialogStudent.name}
          faculty={dialogStudent.faculty}
          sex={dialogStudent.sex}
          status={dialogStudent.status}
          isOpen={isDialogOpen}
          onClose={this.handleCloseDialog}
        />}
        <TableCard
          topic="Uczestnicy"
          columns={columns}
          header={[
            { key: 'Ilość uczestników', value: studentCount },
            { key: 'Zapisani do pokojów', value: inRoomsCount },
            { key: 'Samotnicy', value: soloCount },
          ]}
          rows={this.prepareDataForDynamicTable(students)}
          onRemove={participantInfo => this.deleteParticipants(participantInfo, eventName)}
        />
      </>
    );
  }
}

export default withRouter(ParticipantsRoute);
