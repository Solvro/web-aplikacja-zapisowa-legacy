import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TableCard from '../../components/TableCard';
import EditParticipantDialog from '../../components/EditParticipantDialog';
import { getParticipantsList, removeParticipant, editParticipant } from '../../store/Api';

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
    this.setState(() => ({
      isDialogOpen: !this.state.isDialogOpen,
    }));
  }

  openDialog = (studentInfo) => {
    const student = this.state.students.filter(std => studentInfo.Index.props.children === std.index);
    this.setState({isDialogOpen: true, dialogStudent: student[0] || {}});
  }


   handleCloseDialog = async (data) => {
    this.toggleDialog();
    console.log(data, 'dataSent')
    if(data !== null){
      await editParticipant(this.state.eventName, data);
      const response = await getParticipantsList(this.state.eventName);
      const { stats, students } = response;

      this.setState({
        stats,
        students,
        dialogStudent: students[0],
      });
    }
  }

  prepareDataForDynamicTable(preStudents) {
    const sexMap = {
      M: 'Mężczyzna',
      F: 'Kobieta',
    };
    const statusMap = {
      N: 'Niezapisany',
      S: 'Zapisany Samodzielnie',
      G: 'Zapisany Grupowo',
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

  deleteParticipants = async (participantInfo, eventName) => {
    const decision = prompt(`Czy jesteś pewien, że chcesz usunąć ${participantInfo['Imię i nazwisko'].props.children.props.children}? Wpisz tak, aby potwierdzić.`);
    if(decision === 'tak'){
      await removeParticipant(eventName, participantInfo);
      const response = await getParticipantsList(eventName);
      const { stats, students } = response;

      this.setState({
        stats,
        students,
        dialogStudent: students[0],
      });
    }
  };

  render() {
    const { students, stats, isDialogOpen, dialogStudent, eventName } = this.state;
    const { students: studentCount, solo_students: soloCount, students_in_rooms: inRoomsCount } = stats;
    return (
      <>
        {isDialogOpen && <EditParticipantDialog
          name={dialogStudent.name}
          faculty={dialogStudent.faculty}
          sex={dialogStudent.sex}
          status={dialogStudent.status}
          index={dialogStudent.index}
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
          onEdit={this.openDialog}
        />
      </>
    );
  }
}

export default withRouter(ParticipantsRoute);
