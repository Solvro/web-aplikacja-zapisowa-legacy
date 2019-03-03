import React from 'react';
import { TextField } from '@material-ui/core';
import TextLengthCounter from './TextLengthCounter';
import LabelWithIcon from './LabelWithIcon';

class FormTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(name) {
    return (event) => {
      this.setState({
        [name]: event.target.value,
      });
    };
  }

  render() {
    const {
      label, icon, maxCharLength, onChange, value, ...other
    } = this.props;
    const { error } = this.state;
    return (
      <TextField
        {...other}
        id="filled-full-width"
        label={<LabelWithIcon fontSize="small" icon={icon} label={label} />}
        margin="normal"
        variant="standard"
        error={error}
        value={value}
        onChange={onChange}
        helperText={maxCharLength
          ? (
            <TextLengthCounter
              onError={this.handleChange('error')}
              current={value ? value.length : 0}
              max={maxCharLength}
            />
          ) : null}
      />
    );
  }
}

export default FormTextInput;
