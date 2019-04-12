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
import {authorizeUser, verifyUser} from '../../store/api';
import {connect, Dispatch} from "react-redux";
import {ApplicationState} from "../../store";
import {addError, signIn} from "../../store/RoomMate/actions";
import {RoomMate, StudentErrors} from "../../store/RoomMate/types";


interface Props {
    history: {
        push(url: string): void;
    };
    signIn(user: RoomMate): void;
    addError(message: string): void;
}

const mapDispatchToProps = (dispatch: Dispatch<ApplicationState>): Partial<Props> => {
    return {
        signIn(user: RoomMate) {
            dispatch(signIn(user));
        },
        addError(message: string) {
            dispatch(addError(message));
        }
    }
};

class LoginScreen extends React.Component<WithStyles <typeof loginScreenStyles> & Props> {

    state = {
        username: '',
        password: '',
    };

    tryAuthorize = async (e: React.FormEvent) => {
        e.preventDefault();
        const {username, password} = this.state;
        const authorizationResult = await authorizeUser(username, password);
        const token = authorizationResult ? authorizationResult.access : false;
        if (token) {
            await localStorage.setItem('token', token);
            await localStorage.setItem('signedInStudent', JSON.stringify(authorizationResult.student));
            this.props.signIn(authorizationResult.student);
            this.props.history.push('/AddingRoomMates');
        } else {
            this.props.addError(StudentErrors.signInFailed);
        }
    };

    onInputPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({password: e.target.value});
    };

    onInputLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({username: e.target.value});
    };

    componentWillMount(){
        this.validateIsLogged()
            .then(isLogged => {
                if (isLogged)
                    this.props.history.push('/AddingRoomMates');
            });

    }

    validateIsLogged = async () => {
        const token = await localStorage.getItem('token');
        return token && await verifyUser(token);
    };

    public render(): React.ReactNode {

        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <Grid container={true} justify={"center"} alignItems={"center"}>
                    <Grid item={true} xl={5} lg={6} md={8} xs={10}>
                        <Paper
                            square={true}
                            className={classes.loginCard}
                        >
                            <FacultyLogo size={15}/>
                            <Typography color="primary" align="center" variant="h3">
                                Jesienny Rajd Mechanika
                            </Typography>
                            <form onSubmit={this.tryAuthorize} className={classes.form}>
                                <FormControl margin="normal" required fullWidth={false}>
                                    <InputLabel htmlFor="login">Login</InputLabel>
                                    <Input
                                        id="login"
                                        className={classes.input}
                                        name="login"
                                        autoComplete="login"
                                        autoFocus={true}
                                        onChange={this.onInputLoginChange}
                                        required
                                        />
                                </FormControl>
                                <FormControl margin="normal" required fullWidth={false}>
                                    <InputLabel htmlFor="password">Hasło</InputLabel>
                                    <Input
                                        className={classes.input}
                                        onChange={this.onInputPasswordChange}
                                        name="password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        required
                                    />
                                </FormControl>
                                <Button
                                    onClick={this.tryAuthorize}
                                    fullWidth={false}
                                    variant="contained"
                                    color="primary"
                                >
                                    <div className={classes.buttonLink}>
                                        Zaloguj
                                    </div>
                                </Button>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }

}

export default connect(null, mapDispatchToProps)(withStyles(loginScreenStyles)(LoginScreen));
