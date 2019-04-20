import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import TrendingIcon from '@material-ui/icons/TrendingUp';
import PeopleIcon from '@material-ui/icons/People';
import SadFaceIcon from '@material-ui/icons/SentimentDissatisfied';
import ContentGridItem from './ContentGridItem';
import Tile from './Tile';
import StatisticsProgress from './StatisticsProgress';

function StatisticsTile(props) {
  const {
    studentsNumber,
    registeredStudents,
    soloRegistrededStudents,
    numbersNotFullRooms,
  } = props;
  return (
    <Tile title="Statystyki" icon={<TrendingIcon color="primary" />}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="stretch"
        spacing={16}
      >
        <ContentGridItem
          xs={3}
          title={(
            <Typography variant="h4">
              { studentsNumber }
            </Typography>
          )}
          value={<Typography variant="subtitle2">Osób zapisanych na rajd.</Typography>}
          icon={<PeopleIcon fontSize="large" />}
        />
        <StatisticsProgress
          thickness={6}
          size={36}
          value={registeredStudents.percentage}
          description="Osób zapisanych do swoich pokoi."
          xs={3}
        />
        <ContentGridItem
          xs={3}
          title={(
            <Typography variant="h4">
              { studentsNumber - registeredStudents.no}
            </Typography>
          )}
          value={<Typography variant="subtitle2">Osób niezapisanych.</Typography>}
          icon={<SadFaceIcon fontSize="large" />}
        />
        <StatisticsProgress
          thickness={6}
          size={36}
          value={numbersNotFullRooms.percentage}
          description="Stan niezapełnionych pokoi."
          xs={3}
        />
      </Grid>
    </Tile>
  );
}

export default StatisticsTile;
