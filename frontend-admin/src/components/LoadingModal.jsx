import React from 'react';
import { withStyles, CircularProgress, Modal } from '@material-ui/core';

const styles = theme => ({
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    outline: 'none',
    transform: 'translate(-50%, -50%)',
  },
});

function LoadingModal(props) {
  const { classes, isOpen } = props;
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={isOpen}
    >
      <div className={classes.paper}>
        <CircularProgress size={64} color="secondary" />
      </div>
    </Modal>
  );
}

export default withStyles(styles)(LoadingModal);
