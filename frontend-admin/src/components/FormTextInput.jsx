import React from 'react';
import {TextField} from '@material-ui/core';
import TextLengthCounter from './TextLengthCounter';
import LabelWithIcon from './LabelWithIcon';

class FormTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            error: false
        }
    }

    handleChange = (name, onChange) => event => {
        this.setState({
            [name]: event.target.value,
        });
        if (onChange) {
            onChange(event)
        }
    };

    render() {
        const {label, icon, maxCharLength, onChange, ...other} = this.props;
        return (
            <TextField
                {...other}
                id="filled-full-width"
                label={<LabelWithIcon fontSize='small' icon={icon} label={label}/>}
                margin='normal'
                variant='standard'
                error={this.state.error}
                onChange={this.handleChange('value', onChange)}
                helperText={maxCharLength ?
                    <TextLengthCounter onError={this.handleChange('error', null)} current={this.state.value.length}
                                       max={maxCharLength}/> : null}
            />
        )
    }
}

export default FormTextInput