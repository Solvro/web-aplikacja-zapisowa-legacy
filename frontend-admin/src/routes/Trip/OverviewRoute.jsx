import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { GridList, GridListTile } from '@material-ui/core';
import DashboardHeader from '../../components/DashboardHeader';
import InformationTile from '../../components/InformationTile';
import StatisticsTile from '../../components/StatisticsTile';

class OverviewRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // const { match } = this.props;
    return (
      <div>
        <GridList cellHeight={'auto'} cols={3} spacing={16}>
          <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>
            <DashboardHeader
              title='Jesienny Rajd Mechanika'
              subtitle='Wieloletnia tradycja wydziału mechanicznego, głuchołazy bla bla'
              date={{ day: 'Piątek', full: '31 marca' }}
            />
          </GridListTile>

          <GridListTile cols={1}>
            <InformationTile/>
          </GridListTile>

          <GridListTile cols={1}>
            <StatisticsTile/>
          </GridListTile>
        </GridList>
      </div>
    );
  }
}

export default withRouter(OverviewRoute);
