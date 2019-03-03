import React from 'react'
import { withStyles } from '@material-ui/core'
import { Card, CardContent, CardHeader } from '@material-ui/core'

const styles = theme => ({
  header: {
    backgroundColor: theme.palette.primary[50],
    padding: theme.custom.padding,
  }
});

function Tile(props) {
  const { children, classes, title, icon } = props;
  return (
    <Card>
      <CardHeader titleTypographyProps={{ variant: 'h5' }} className={classes.header} avatar={icon} title={title} />
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(Tile);