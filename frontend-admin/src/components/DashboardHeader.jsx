import React from 'react';
import {
  withStyles, Grid, Paper, Typography,
} from '@material-ui/core';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
  },

  subtitle: {
    fontSize: theme.typography.subheading.fontSize,
    fontWeight: theme.typography.fontWeightMedium,
  },

  date: {
    fontSize: theme.typography.fontSize * 3,
  },
});

function DashboardHeader(props) {
  const {
    classes, title, subtitle, date,
  } = props;
  return (
    <Paper className={classes.root}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
      >
        <Grid item sm={12} md={4}>
          <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="flex-start"
          >
            <Grid item xs={12}>
              <Typography variant="h5">{title}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color="textSecondary" className={classes.subtitle}>{subtitle}</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sm={12} md={8}>
          <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="flex-end"
          >
            <Grid item xs={12}>
              <Typography variant="h5">{date.day}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color="textSecondary" className={[classes.subtitle, classes.date].join(' ')}>{date.full}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default withStyles(styles)(DashboardHeader);
