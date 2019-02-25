import React from 'react';
import { withStyles, TextField } from '@material-ui/core';
import DateIcon from '@material-ui/icons/DateRange';
import TextLengthCounter from './TextLengthCounter';

const styles = theme => ({
    cssLabel: {
        '&$cssFocused': {
            color: theme.palette.secondary.dark,
        },
    },
    cssFocused: {},
    cssUnderline: {
        '&:after': {
            borderBottomColor: theme.palette.secondary.dark,
        },
    },
});



class FormTextInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            error: false
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { classes, label, icon: Icon, maxCharLength, ...other } = this.props
        return (
            <TextField
                {...other}
                id="filled-full-width"
                label={<div>{Icon ? <Icon fontSize='small' style={{ verticalAlign: 'text-bottom' }} /> : null} {label}</div>}
                fullWidth
                margin='normal'
                variant='standard'
                className={classes.input}
                InputLabelProps={{
                    classes: {
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                    }
                }}
                InputProps={{
                    classes: {
                        focused: classes.cssFocused,
                        underline: classes.cssUnderline
                    }
                }}
                error={this.state.error}
                onChange={this.handleChange('value')}
                helperText={maxCharLength ? <TextLengthCounter onError={this.handleChange('error')} current={this.state.value.length} max={maxCharLength} /> : null}
            />
        )
    }
}

export default withStyles(styles)(FormTextInput)