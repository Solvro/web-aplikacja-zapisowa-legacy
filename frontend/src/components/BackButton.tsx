import * as React from 'react';
import {createStyles, IconButton, withStyles, WithStyles} from "@material-ui/core";
import {ArrowBack} from "@material-ui/icons";
import {NavLink} from "react-router-dom";

type BackButtonProps = {
    path: string;
}

const backButtonStyles = createStyles({
    navLink: {
        '& :hover': {
            textDecoration: 'none',
            color: 'black',
        },
        '& :active': {
            textDecoration: 'none',
            color: 'black',
        }
    }
});

class BackButton extends React.Component<BackButtonProps & WithStyles<typeof backButtonStyles>> {
    render() {
        const { classes } = this.props;
        return (
            <IconButton style={{
                position: 'absolute',
                left: '1em',
                top: '1em',
            }}>
                <NavLink to={this.props.path}
                    className={classes.navLink}
                >
                    <ArrowBack />
                </NavLink>
            </IconButton>
        );
    }
}

export default withStyles(backButtonStyles)(BackButton);