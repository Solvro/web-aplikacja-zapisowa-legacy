import React from 'react'
import DescriptionIcon from '@material-ui/icons/Description'
import Tile from './Tile'
import ContentListItem from './ContentListItem'
import { List } from '@material-ui/core';
import CalendarIcon from '@material-ui/icons/DateRange'
import LocationIcon from '@material-ui/icons/LocationOn'
import BedIcon from '@material-ui/icons/LocalHotel'

function InformationTile(props) {
  return <Tile title={'Informacje'} icon={<DescriptionIcon color='primary' />}>
    <List>
      <ContentListItem title={'Termin wycieczki'} value={'Kappa'} icon={CalendarIcon} />
      <ContentListItem title={'Termin wycieczki'} value={'Kappa'} icon={LocationIcon} />
      <ContentListItem title={'Termin wycieczki'} value={'Kappa'} icon={BedIcon} />
    </List>
  </Tile>
}

export default InformationTile;