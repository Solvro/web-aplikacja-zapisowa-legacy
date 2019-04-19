import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core'

const styles = theme => ({
  primary: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.fontSize,
    fontWeight: theme.typography.fontWeightMedium
  },
  secondary: {
    color: theme.palette.text.primary,
    fontSize: theme.typography.fontSize * 1.5
  },
  icon: {
    color: theme.palette.common.black,
  }
});

class ContentGridItem extends React.Component {
  render() {
    const { classes, title, value, icon, ...other } = this.props;
    return (
      <Grid {...other} item>
        <Grid
          container
          direction='column'
          justify='center'
          alignItems='center'
          spacing={16}
        >
          <Grid item>{icon}</Grid>
          <Grid item>{title}</Grid>
          <Grid item>{value}</Grid>
        </Grid>
      </Grid>
    );
  }
}

ContentGridItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContentGridItem);
