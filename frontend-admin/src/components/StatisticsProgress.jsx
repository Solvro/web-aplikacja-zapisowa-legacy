import React from 'react'
import { Typography, CircularProgress, withStyles } from '@material-ui/core';
import ContentGridItem from './ContentGridItem';

const styles = theme => ({
  progress: {
    backgroundColor: 'cyan',
    border: '1px solid black'
  }
})

function StatisticsProgress(props) {
  const { classes, value, description, size, thickness, ...other } = props

  return <ContentGridItem
    {...other}
    title={<Typography variant='h4'>{value}%</Typography>}
    value={<Typography variant='subtitle2'>{description}</Typography>}
    icon={
      <div style={{ position: 'relative' }}>
        <CircularProgress thickness={thickness} style={{ position: 'absolute' }} size={size} color='secondary' variant='static' value={100} />
        <CircularProgress thickness={thickness} size={size} variant='static' value={value} />
      </div>} />
}

export default withStyles(styles)(StatisticsProgress)