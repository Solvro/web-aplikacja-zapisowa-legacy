import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import moment from 'moment';
import 'moment/locale/pl';
import CircularProgress from '@material-ui/core/CircularProgress';
import DashboardHeader from '../../components/DashboardHeader';
import InformationTile from '../../components/InformationTile';
import StatisticsTile from '../../components/StatisticsTile';
import {
  getEventDetails, deleteEvent, changeEventRegistrationStatus, getStatistics,
} from '../../store/Api';
import ButtonsControlTile from '../../components/ButtonsControlTile';
import ConfirmDialog from '../../components/ConfirmDialog';
import LoadingModal from '../../components/LoadingModal';

moment.locale('pl');

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

class OverviewRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      isRegistrationOpen: false,
      isAlertOpen: false,
      isLoading: true,
    };
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
    this.toggleDialog = this.toggleDialog.bind(this);
    this.onDeleteTrip = this.onDeleteTrip.bind(this);
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    this.setState({ isLoading: true });
    const details = await getEventDetails(id);
    const statistics = await getStatistics(id);
    if (details) {
      this.setState({ ...details, statistics, isLoading: false });
    }
  }

  async onDeleteTrip(confirm) {
    if (confirm) {
      this.setState({ isLoading: true });
      const eventName = this.props.match.params.id;
      const response = await deleteEvent(eventName);
      this.setState({ isLoading: false });
      alert(response);
    }
    this.toggleDialog();
  }

  toggleDialog() {
    const { isAlertOpen } = this.state;
    this.setState({
      isAlertOpen: !isAlertOpen,
    });
  }

  handleSwitchChange(name) {
    return async (_, checked) => {
      this.setState({ isLoading: true });
      const response = await changeEventRegistrationStatus(checked);
      this.setState({
        [name]: response,
        isLoading: false,
      });
    };
  }

  render() {
    const mmt = moment();
    const today = capitalizeFirstLetter(mmt.format('dddd'));
    const fullDate = mmt.format('D MMMM');
    const {
      name,
      description,
      beginning_date: startDate,
      ending_date: endDate,
      place,
      accommodation,
      statistics,
      statisticsLoaded,
      isLoading,
      isRegistrationOpen,
      isAlertOpen,
    } = this.state;
    return (
      <div>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <DashboardHeader
              title={name}
              subtitle={description}
              date={{ day: today, full: fullDate }}
            />
          </Grid>

          <Grid item sm={12} md={6} lg={4}>
            <InformationTile
              startDate={startDate}
              endDate={endDate}
              place={place}
              accommodation={accommodation}
            />
          </Grid>

          <Grid item sm={12} md={6} lg={8}>
            {
              statistics && (
                <StatisticsTile
                  studentsNumber={statistics.students.no}
                  registeredStudents={statistics.students_registered}
                  soloRegistrededStudents={statistics.students_solo}
                  numbersNotFullRooms={statistics.rooms_not_full}
                />
              )}
          </Grid>

          <Grid item sm={12} md={12} lg={8}>
            <ButtonsControlTile
              isRegistrationOpen={isRegistrationOpen}
              onRegistrationStatusChange={this.handleSwitchChange('isRegistrationOpen')}
              onDeleteTrip={this.toggleDialog}
            />
          </Grid>
        </Grid>
        <ConfirmDialog
          title="Usuwanie wycieczki"
          message="Czy na pewno chcesz usunąć wycieczkę?"
          isOpen={isAlertOpen}
          onClose={this.onDeleteTrip}
        />
        <LoadingModal isOpen={isLoading} />
      </div>
    );
  }
}

export default withRouter(OverviewRoute);
