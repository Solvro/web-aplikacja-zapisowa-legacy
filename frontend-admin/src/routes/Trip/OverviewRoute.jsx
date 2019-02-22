import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import Tile from "../../components/Tile"
import DescriptionIcon from "@material-ui/icons/Description"
import { Button } from '@material-ui/core';

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
        <Tile title={"Informacje"} icon={<DescriptionIcon color="primary"/>}>
            <Button color="secondary">Klik</Button>
        </Tile>
      </div>
    );
  }
}

export default withRouter(OverviewRoute);
