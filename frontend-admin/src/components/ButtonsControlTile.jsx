import React from 'react';
import {
  Grid, Typography, Switch, Button, withStyles,
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/Delete';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ContentGridItem from './ContentGridItem';
import Tile from './Tile';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

function ButtonsControlTile(props) {
  const {
    classes, isRegistrationOpen, onRegistrationStatusChange, onDeleteTrip,
  } = props;
  return (
    <Tile title="Zarządzanie wycieczką" icon={<SettingsIcon color="primary" />}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="stretch"
        spacing={16}
      >
        <ContentGridItem
          xs={6}
          title={(
            <>
              <Switch
                checked={isRegistrationOpen}
                value={isRegistrationOpen}
                onChange={onRegistrationStatusChange}
              />
              <Typography style={{ display: 'inline-block' }} variant="subtitle2">
                { `Zapisy ${isRegistrationOpen ? 'otwarte' : 'zamknięte'}`}
              </Typography>
            </>
          )}
          value={<Typography variant="subtitle2">Decyduj o statusie zapisów</Typography>}
          icon={<AssignmentIndIcon fontSize="large" />}
        />
        <ContentGridItem
          xs={6}
          title={(
            <Button onClick={onDeleteTrip} variant="contained" color="primary" className={classes.button}>
              Usuń wycieczkę
              <DeleteIcon className={classes.rightIcon} />
            </Button>
          )}
          value={<Typography variant="subtitle2">Usuwa bezpowrotnie wycieczkę</Typography>}
        />
      </Grid>
    </Tile>
  );
}

export default withStyles(styles)(ButtonsControlTile);
