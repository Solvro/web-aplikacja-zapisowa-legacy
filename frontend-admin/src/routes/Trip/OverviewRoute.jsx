import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Tile from "../../components/Tile"
import DescriptionIcon from '@material-ui/icons/Description'
import { GridList, GridListTile, List } from '@material-ui/core';
import CalendarIcon from '@material-ui/icons/DateRange'
import DashboardHeader from '../../components/DashboardHeader';
import ContentListItem from '../../components/ContentListItem';

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

          <GridListTile>
            <Tile title={"Informacje"} icon={<DescriptionIcon color="primary" />}>
              <List>
                <ContentListItem title={'Termin wycieczki'} value={'Kappa'} icon={CalendarIcon}/>
                <ContentListItem title={'Termin wycieczki'} value={'Kappa'} icon={CalendarIcon}/>
                <ContentListItem title={'Termin wycieczki'} value={'Kappa'} icon={CalendarIcon}/>
              </List>
            </Tile>
          </GridListTile>
        </GridList>
      </div>
    );
  }
}

export default withRouter(OverviewRoute);
