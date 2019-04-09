import React from 'react';
import {
  FormControl, InputLabel, Input, InputAdornment, IconButton, Chip, withStyles,
} from '@material-ui/core';
import UploadIcon from '@material-ui/icons/CloudUpload';

const styles = {
  root: {
    overflow: 'hidden',
    textOverflow: 'elipsis',
  },

  chip: {
    position: 'absolute',
    bottom: '1px',
  },
};

class UploadFileInput extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.handleFileSelected = this.handleFileSelected.bind(this);
    this.handleOpenFileSelect = this.handleOpenFileSelect.bind(this);
    this.handleFileCancel = this.handleFileCancel.bind(this);
  }


  handleOpenFileSelect() {
    this.inputRef.current.click();
  }

  handleFileSelected(onChange) {
    return () => {
      const { files } = this.inputRef.current;
      if (files.length) {
        onChange({
          target: {
            value: files[0],
          },
        });
      }
    };
  }

  handleFileCancel(onDelete) {
    return () => {
      this.inputRef.current.files = null;
      this.inputRef.current.value = null;
      onDelete({
        target: {
          value: null,
        },
      });
    };
  }

  render() {
    const {
      classes, label, value, onChange, accept, ...other
    } = this.props;
    return (
      <FormControl fullWidth className={classes.root}>
        <InputLabel shrink={!!value} htmlFor="adornment-fileselect">{label}</InputLabel>
        <input accept={accept} ref={this.inputRef} type="file" style={{ visibility: 'hidden' }} onChange={this.handleFileSelected(onChange)} />
        <Input
          {...other}
          id="adornment-fileselect"
          type="text"
          readOnly
          onClick={this.handleOpenFileSelect}
          onKeyPressCapture={this.handleOpenFileSelect}
          startAdornment={
            value
              ? (
                <InputAdornment className={classes.chip} position="start">
                  <Chip
                    onDelete={this.handleFileCancel(onChange)}
                    label={value.name}
                    className={classes.chip}
                  />
                </InputAdornment>
              ) : null
          }
          endAdornment={(
            <InputAdornment position="end">
              <IconButton
                aria-label="Select file to upload"
                tabIndex={-1}
              >
                <UploadIcon />
              </IconButton>
            </InputAdornment>
          )}
        />
      </FormControl>
    );
  }
}

export default withStyles(styles)(UploadFileInput);
