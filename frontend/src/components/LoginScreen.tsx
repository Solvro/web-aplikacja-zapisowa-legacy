import {createStyles, withStyles, WithStyles} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Button from "@material-ui/core/Button/Button";
import {cyan} from "@material-ui/core/colors";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Grid from "@material-ui/core/Grid/Grid";
import Input from "@material-ui/core/Input/Input";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Paper from "@material-ui/core/Paper/Paper";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import React from 'react';
import Background from '../img/schoolbus.jpg';
import {FacultyLogo} from "./FacultyLogo";

const styles = createStyles({
    container: {
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    facultyLogoImage: {
        fill: cyan.A200,
        height: '6em',
        width: '6em',
    },
    form: {
        alignItems: 'center',
        display: 'flex',
        flex: '0.3 0.3 auto',
        flexDirection: 'column',
        justifyContent: 'space-between',
        '& > button': {
            marginTop: '1.5em',
        }
    },
    loginCard: {
        alignItems: 'center',
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        '& img': {
            marginTop: '3em',
            marginBottom: '2em',
        },
        '& form': {
            marginTop: '1em',
            marginBottom: '2em',
        }
    },
    main: {
        backgroundImage: `url(${Background})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
});

class LoginScreen extends React.Component<WithStyles <typeof styles>> {
    public render(): React.ReactNode {

        const { classes } = this.props;
        return (
            <div className={classes.main}>
                <AppBar color={"default"} position={"static"}>
                    <Toolbar>
                        <Typography variant="title" color={"textPrimary"}>
                            Aplikacja zapisowa
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className={classes.container}>
                    <Grid container={true} justify={"center"} alignItems={"center"}>
                        <Grid item={true} lg={5} md={8} xs={10}>
                            <Paper
                                square={true}
                                className={classes.loginCard}
                            >
                                <FacultyLogo size={15}/>
                                <Typography color="primary" align="center" variant="display2">
                                    Jesienny Rajd Mechanika
                                </Typography>
                                <form className={classes.form}>
                                    <FormControl margin="normal" required={true} fullWidth={false}>
                                        <InputLabel htmlFor="login">Login</InputLabel>
                                        <Input id="login" name="login" autoComplete="login" autoFocus={true} />
                                    </FormControl>
                                    <FormControl margin="normal" required={true} fullWidth={false}>
                                        <InputLabel htmlFor="password">Hasło</InputLabel>
                                        <Input
                                            name="password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                        />
                                    </FormControl>
                                    <Button
                                        type="submit"
                                        fullWidth={false}
                                        variant="raised"
                                        color="primary"
                                    >
                                        Zaloguj
                                    </Button>
                                </form>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );

    }
}

export default withStyles(styles)(LoginScreen);