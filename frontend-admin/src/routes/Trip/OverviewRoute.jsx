import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import Tile from "../../components/Tile"
import DescriptionIcon from "@material-ui/icons/Description"
import { Button } from '@material-ui/core';
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
        Overview
        { match.params.id }
        <DashboardHeader 
        title='Jesienny Rajd Mechanika'
        subtitle='Wieloletnia tradycja wydziału mechanicznego, głuchołazy bla bla'
        date={{day: 'Piątek', full: '31 marca'}}
        />
        <Tile title={"Informacje"} icon={<DescriptionIcon color="primary"/>}>
            <Button color="primary">Klik</Button>
        </Tile>
      </div>
    );
  }
}

export default withRouter(OverviewRoute);
