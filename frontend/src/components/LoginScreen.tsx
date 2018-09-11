import {createStyles} from "@material-ui/core";
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
        justifyContent: 'space-around',
    },
    loginCard: {
        alignItems: 'center',
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: '50vh',
        justifyContent: 'space-around',
        padding: '1em',
    },
    main: {
        backgroundImage: `url(${Background})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    }
});

class LoginScreen extends React.Component{
    public render() {

        return (
            <div style={styles.main}>
                <AppBar color={"default"} position={"static"}>
                    <Toolbar>
                        <Typography variant="title" color={"textPrimary"}>
                            Aplikacja zapisowa
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div style={styles.container}>
                    <Grid container={true} justify={"center"} alignItems={"center"}>
                        <Grid item={true} xs={4}>
                            <Paper square={true} style={styles.loginCard}>
                                <FacultyLogo size={7}/>
                                <Typography color="primary" variant="display2">Jesienny Rajd Mechanika</Typography>
                                <form style={styles.form}>
                                    <FormControl margin="normal" required={true} fullWidth={true}>
                                        <InputLabel htmlFor="login">Login</InputLabel>
                                        <Input id="login" name="login" autoComplete="login" autoFocus={true} />
                                    </FormControl>
                                    <FormControl margin="normal" required={true} fullWidth={true}>
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

export default LoginScreen;