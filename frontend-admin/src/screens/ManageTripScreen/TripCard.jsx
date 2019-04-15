import { withStyles } from '@material-ui/core';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { tripCardStyles } from './TripCardStyle';

const TripCard = (props) => {
  const {
    classes, onClick, image, overlayText, description,
  } = props;

  return (
    <Card onClick={onClick} square>
      <CardMedia className={classes.media} image={image} title="Trip">
        {overlayText && (
          <Typography className={classes.overlayText} variant="h5">
            {overlayText}
          </Typography>
        )}
      </CardMedia>
      <Paper square className={classes.cardFooter}>
        <Typography className={classes.description} variant="h5">
          {description}
        </Typography>
      </Paper>
    </Card>
  );
};

export default withStyles(tripCardStyles)(TripCard);
