import React from 'react'
import { FormControl, InputLabel, Input, InputAdornment, IconButton, Chip, withStyles } from '@material-ui/core';
import UploadIcon from '@material-ui/icons/CloudUpload'

const styles = {
    root: {
        overflow: 'hidden',
        textOverflow: 'elipsis'
    },

    chip: {
        position: 'absolute',
        bottom: '1px',
    }
}

class UploadFileInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            file: null
        };
        this.inputRef = React.createRef()
        this.handleOpenFileSelect = this.handleOpenFileSelect.bind(this)
        this.handleFileSelected = this.handleFileSelected.bind(this)
        this.handleFileCancel = this.handleFileCancel.bind(this)
    }


    handleOpenFileSelect(event) {
        this.inputRef.current.click()
    }

    handleFileSelected(event) {
        const files = this.inputRef.current.files
        if (files.length > 0) {
            this.setState({
                file: files[0]
            })
            this.props.onChange({
                target: {
                    value: files[0]
                }
            })
        }
    }

    handleFileCancel(event) {
        this.inputRef.current.files = null
        this.inputRef.current.value = null
        this.setState({ file: null })
    }

    render() {
        const { classes, label, ...other } = this.props
        return (
            <FormControl fullWidth className={classes.root}>
                <InputLabel shrink={!!this.state.file} htmlFor='adornment-fileselect'>{label}</InputLabel>
                <input ref={this.inputRef} type='file' style={{ visibility: 'hidden' }} onChange={this.handleFileSelected} />
                <Input
                    {...other}
                    id='adornment-fileselect'
                    type={'text'}
                    readOnly
                    onChange={this.handleSelectFile}
                    onClick={this.handleOpenFileSelect}
                    onKeyPressCapture={this.handleOpenFileSelect}
                    startAdornment={
                        this.state.file ?
                            <InputAdornment className={classes.chip} position='start'>
                                <Chip onDelete={this.handleFileCancel} label={this.state.file.name} className={classes.chip} />
                            </InputAdornment> : null
                    }
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label='Select file to upload'
                                tabIndex={-1}
                            >
                                <UploadIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        )
    }
}

export default withStyles(styles)(UploadFileInput);