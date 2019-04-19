import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import moment from 'moment';
import 'moment/locale/pl';
import DashboardHeader from '../../components/DashboardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import InformationTile from '../../components/InformationTile';
import StatisticsTile from '../../components/StatisticsTile';
import { getEventDetails, getStatistics } from '../../store/Api';

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
      statisticsLoaded: false,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const details = await getEventDetails(id);
    const statistics = await getStatistics(id);
    if (details) {
      this.setState({ details, statistics, statisticsLoaded: true });
    }
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

          <Grid item sm={12} md={10} lg={8}>
            {
              statisticsLoaded
                ? (
                  <StatisticsTile
                    studentsNumber={statistics.students.no}
                    registeredStudents={statistics.students_registered}
                    soloRegistrededStudents={statistics.students_solo}
                    numbersNotFullRooms={statistics.rooms_not_full}
                  />
                )
                : <CircularProgress color="secondary" />
            }
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(OverviewRoute);
