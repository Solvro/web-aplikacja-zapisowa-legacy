import React from 'react'
import { withStyles, Grid, Paper, Typography } from '@material-ui/core';

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing.unit * 2
    },

    subtitle: {
        fontSize: theme.typography.subheading.fontSize,
        fontWeight: theme.typography.fontWeightMedium,
    },

    date: {
        fontSize: theme.typography.fontSize * 3
    }
});

class DashboardHeader extends React.Component {
    render() {
        const { classes, title, subtitle, date } = this.props
        return (
            <Paper className={classes.root}>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-start"
                >
                    <Grid item>
                        <Grid
                            container
                            direction="column"
                            justify="space-between"
                            alignItems="flex-start"
                        >
                            <Grid item xs={12}>
                                <Typography variant='h5'>{title}</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography wrap color='textSecondary' className={classes.subtitle}>{subtitle}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Grid
                            container
                            direction="column"
                            justify="space-between"
                            alignItems="flex-end"
                        >
                            <Grid item xs>
                                <Typography variant='h5'>{date.day}</Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography wrap color='textSecondary' className={[classes.subtitle, classes.date]}>{date.full}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default withStyles(styles)(DashboardHeader)