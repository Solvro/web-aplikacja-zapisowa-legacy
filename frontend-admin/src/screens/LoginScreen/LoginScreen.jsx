import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import FormControl from '@material-ui/core/FormControl/FormControl';
import Grid from '@material-ui/core/Grid/Grid';
import Input from '@material-ui/core/Input/Input';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import Paper from '@material-ui/core/Paper/Paper';
import Typography from '@material-ui/core/Typography/Typography';
import React from 'react';
import { FacultyLogo } from '../../components/FacultyLogo';
import { loginScreenStyles } from './LoginScreenStyles';
import { authorizeUser, verifyUser } from '../../store/Api';
import ErrorDisplay from '../../components/ErrorDisplay';


class LoginScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            loginError: false
        }
    }

    tryAuthorize = async e => {
        e.preventDefault();
        const {username, password} = this.state;
        const token = await authorizeUser(username, password);
        if (token) {
            await localStorage.setItem('token', token);
            this.props.history.push('/trips')
        } else {
            this.setState({loginError: true})
        }
    }

    onInputPasswordChange = e => {
        this.setState({password: e.target.value})
    }

    onInputLoginChange = e => {
        this.setState({username: e.target.value})
    }

    keySubmit = e => {
        if (e.key === 'Enter') {
            this.tryAuthorize(e);
        }
    }

    validateIsLogged = async () => {
        const token = await localStorage.getItem('token');
        const isLogged = token && await verifyUser(token);
        return isLogged;
    }



    render() {
        const { classes } = this.props;
        return (
            <div onKeyPress={this.keySubmit}  className={classes.container}>
                {this.state.loginError &&
                <ErrorDisplay
                    removeError={id => {this.setState({loginError: false})}}
                    errors={[{message: 'Błędny login lub hasło.', id: 100}]}
                    />}
                <Grid container={true} justify={'center'} alignItems={'center'}>
                    <Grid item={true} xl={5} lg={6} md={8} xs={10}>
                        <Paper
                            square={true}
                            className={classes.loginCard}
                        >
                            <FacultyLogo size={15}/>
                            <Typography color='primary' align='center' variant='h3'>
                                Jesienny Rajd Mechanika
                            </Typography>
                            <form onSubmit={this.tryAuthorize} className={classes.form}>
                                <FormControl margin='normal' required fullWidth={false}>
                                    <InputLabel htmlFor='login'>Login</InputLabel>
                                    <Input
                                        id='login'
                                        className={classes.input}
                                        name='login'
                                        autoComplete='login'
                                        autoFocus={true}
                                        onChange={this.onInputLoginChange}
                                        required
                                        />
                                </FormControl>
                                <FormControl margin='normal' required fullWidth={false}>
                                    <InputLabel htmlFor='password'>Hasło</InputLabel>
                                    <Input
                                        className={classes.input}
                                        onChange={this.onInputPasswordChange}
                                        name='password'
                                        type='password'
                                        id='password'
                                        autoComplete='current-password'
                                        required
                                    />
                                </FormControl>
                                <Button
                                    onClick={this.tryAuthorize}
                                    fullWidth={false}
                                    variant='contained'
                                    color='primary'
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

export default withStyles(loginScreenStyles)(LoginScreen);