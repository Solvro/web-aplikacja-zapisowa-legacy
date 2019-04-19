import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import moment from 'moment';
import 'moment/locale/pl';
import DashboardHeader from '../../components/DashboardHeader';
import InformationTile from '../../components/InformationTile';
import StatisticsTile from '../../components/StatisticsTile';
import { getEventDetails } from '../../store/Api';
import ButtonsControlTile from '../../components/ButtonsControlTile';

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
    };
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const details = await getEventDetails(id);
    if (details) {
      this.setState(details);
    }
  }

  handleSwitchChange(name) {
    return (_, checked) => {
      this.setState({
        [name]: checked,
      });
    };
  }

  render() {
    const mmt = moment();
    const today = capitalizeFirstLetter(mmt.format('dddd'));
    const fullDate = mmt.format('D MMMM');
    const {
      name, description, beginning_date: startDate, ending_date: endDate, place, accommodation, isRegistrationOpen,
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

          <Grid item sm={12} md={6} lg={4}>
            <StatisticsTile />
          </Grid>

          <Grid item sm={12} md={12} lg={8}>
            <ButtonsControlTile
              isRegistrationOpen={isRegistrationOpen}
              onRegistrationStatusChange={this.handleSwitchChange('isRegistrationOpen')}
              onDeleteTrip={() => prompt("Czy na pewno chcesz usunąć wycieczkę?", 'nie')}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(OverviewRoute);
