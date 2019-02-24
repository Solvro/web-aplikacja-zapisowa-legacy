import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import { ListItem, ListItemIcon } from '@material-ui/core'

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

class ContentListItem extends React.Component {
  render() {
    const { classes, title, value, icon: Icon } = this.props;
    return (
        <ListItem>
          <ListItemIcon>
            <Icon className={classes.icon} fontSize='large'/>
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.primary,
              secondary: classes.secondary
            }}
            primary={title}
            secondary={value}
          />
        </ListItem>
    );
  }
}

ContentListItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContentListItem);
