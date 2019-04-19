import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function AlertDialog(props) {
  const {
    isOpen, onClose, message, title,
  } = props;
  return (
    <div>
      <Dialog
        open={isOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose(false)} color="primary" autoFocus>
            Anuluj
          </Button>
          <Button onClick={() => onClose(true)} color="secondary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AlertDialog;
