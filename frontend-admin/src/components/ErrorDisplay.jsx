import {
    createStyles,
    Icon,
    IconButton,
    Slide,
    SnackbarContent,
    withStyles,
} from '@material-ui/core';
import * as React from 'react';
import {Close} from '@material-ui/icons';

const errorDisplayStyles = theme => createStyles({
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    icon: {
        fontSize: 20,
        opacity: 0.9,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    errorsContainer: {
        position: 'absolute',
        left: theme.spacing.unit * 2,
        bottom: theme.spacing.unit * 2,
        display: 'flex',
        flexDirection: 'column-reverse',
        '& > div': {
            marginTop: theme.spacing.unit * 2,
        },
    },
});

class ErrorDisplay extends React.Component {
    render() {
        const {classes, errors} = this.props;
        return (
            <div className={classes.errorsContainer}>
                {errors.map(error => (
                    <Slide direction={'right'} in={true} mountOnEnter={true} unmountOnExit={true}>
                        <SnackbarContent
                            key={error.id}
                            className={classes.error}
                            message={
                                <span className={classes.message}>
                        <Icon className={classes.icon}/>
                                    {error.message}
                        </span>
                            }
                            action={[
                                <IconButton
                                    key='close'
                                    aria-label='Close'
                                    color='inherit'
                                    onClick={() => this.props.removeError(error.id)}
                                >
                                    <Close className={classes.icon}/>
                                </IconButton>,
                            ]}
                        />
                    </Slide>
                ))}
            </div>
        )

    }
}

export default withStyles(errorDisplayStyles, {withTheme: true})(ErrorDisplay);




