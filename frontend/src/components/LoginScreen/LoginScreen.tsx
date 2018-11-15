import {withStyles, WithStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Grid from "@material-ui/core/Grid/Grid";
import Input from "@material-ui/core/Input/Input";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import React from 'react';
import {FacultyLogo} from "../FacultyLogo";
import {loginScreenStyles} from './LoginScreenStyles';


class LoginScreen extends React.Component<WithStyles <typeof loginScreenStyles>> {
    public render(): React.ReactNode {

        const { classes } = this.props;
        return (
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
                                    <Input id="login" name="login" autoComplete="login" autoFocus={true}/>
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
        );

    }
}

export default withStyles(loginScreenStyles)(LoginScreen);