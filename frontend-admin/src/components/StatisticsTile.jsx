import React from 'react'
import { Grid, Typography } from '@material-ui/core';
import Tile from './Tile'
import ContentGridItem from './ContentGridItem';
import TrendingIcon from '@material-ui/icons/TrendingUp'
import PeopleIcon from '@material-ui/icons/People'
import SadFaceIcon from '@material-ui/icons/SentimentDissatisfied'
import StatisticsProgress from './StatisticsProgress';

function StatisticsTile(props) {

    return <Tile title={"Statystyki"} icon={<TrendingIcon color="primary" />}>
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="stretch"
            spacing={16}
        >
            <ContentGridItem
                xs={3}
                title={<Typography variant='h4'>128</Typography>}
                value={<Typography variant='subtitle2'>osób zapisanych na rajd</Typography>}
                icon={<PeopleIcon fontSize='large' />} />
            <StatisticsProgress thickness={6} size={36} value={64} description={'osób zapisanych do swoich pokoi'} xs={3} />
            <ContentGridItem
                xs={3}
                title={<Typography variant='h4'>10</Typography>}
                value={<Typography variant='subtitle2'>osób zapisanych do swoich pokoi</Typography>}
                icon={<SadFaceIcon fontSize='large' />} />
            <StatisticsProgress thickness={6} size={36} value={12} description={'osób zapisanych do swoich pokoi'} xs={3} />
        </Grid>
    </Tile>
}

export default StatisticsTile