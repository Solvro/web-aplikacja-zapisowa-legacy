import AppBar from "@material-ui/core/AppBar/AppBar";
import Button from "@material-ui/core/Button/Button";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Grid from "@material-ui/core/Grid/Grid";
import Input from "@material-ui/core/Input/Input";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Paper from "@material-ui/core/Paper/Paper";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import React from 'react';
import Background from '../img/schoolbus.jpg';

const styles = {
    main: {
        backgroundImage: `url(${Background})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100%',
    }
};

class LoginScreen extends React.Component{
    public render() {
        console.log(styles.main);

        return (
            <div style={styles.main}>
                <AppBar color={"default"}>
                    <Toolbar>
                        <Typography variant="title" color="inherit">
                            Aplikacja zapisowa
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grid style={{height: '100%'}} container={true} justify={"center"} alignItems={"center"}>
                    <Grid item={true} xs={4}>
                        <Paper>
                            <Typography variant="headline">Sign in</Typography>
                            <form>
                                <FormControl margin="normal" required={true} fullWidth={true}>
                                    <InputLabel htmlFor="email">Email Address</InputLabel>
                                    <Input id="email" name="email" autoComplete="email" autoFocus={true} />
                                </FormControl>
                                <FormControl margin="normal" required={true} fullWidth={true}>
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <Input
                                        name="password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                    />
                                </FormControl>
                                <Button
                                    type="submit"
                                    fullWidth={true}
                                    variant="raised"
                                    color="default"
                                >
                                    Sign in
                                </Button>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );

    }
}

export default LoginScreen;