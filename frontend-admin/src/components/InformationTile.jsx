import React from 'react';
import DescriptionIcon from '@material-ui/icons/Description';
import { List } from '@material-ui/core';
import CalendarIcon from '@material-ui/icons/DateRange';
import LocationIcon from '@material-ui/icons/LocationOn';
import BedIcon from '@material-ui/icons/LocalHotel';
import ContentListItem from './ContentListItem';
import Tile from './Tile';

function dateRange(start, end) {
  if (!start || !end) {
    return 'Brak danych';
  }
  return `${start} - ${end}`;
}

function InformationTile(props) {
  const {
    startDate, endDate, place = 'Brak danych', accommodation = 'Brak danych',
  } = props;
  return (
    <Tile title="Informacje" icon={<DescriptionIcon color="primary" />}>
      <List>
        <ContentListItem
          title="Termin wycieczki"
          value={dateRange(startDate, endDate)}
          icon={CalendarIcon}
        />
        <ContentListItem title="Miejsce" value={place} icon={LocationIcon} />
        <ContentListItem title="Nocleg" value={accommodation} icon={BedIcon} />
      </List>
    </Tile>
  );
}

export default InformationTile;
