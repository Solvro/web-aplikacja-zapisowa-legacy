import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Tile from "../../components/Tile"
import DescriptionIcon from "@material-ui/icons/Description"
import { Button, GridList, GridListTile } from '@material-ui/core';
import DashboardHeader from '../../components/DashboardHeader';

class OverviewRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { match } = this.props;
    return (
      <div>
        <GridList cellHeight={180} cols={3} spacing={16}>
          <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>
            <DashboardHeader
              title='Jesienny Rajd Mechanika'
              subtitle='Wieloletnia tradycja wydziału mechanicznego, głuchołazy bla bla'
              date={{ day: 'Piątek', full: '31 marca' }}
            />
          </GridListTile>

          <GridListTile>
            <Tile title={"Informacje"} icon={<DescriptionIcon color="primary" />}>
              <Button color="secondary">Klik</Button>
            </Tile>
          </GridListTile>
        </GridList>
      </div>
    );
  }
}

export default withRouter(OverviewRoute);
