import {cyan, grey} from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import App from './App';
import LoginScreen from "./components/LoginScreen";
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import store from './store/store';

const darkTheme = createMuiTheme({
    palette: {
        primary: {
            main: cyan.A100,
        },
        secondary: {
            main: grey["900"]
        },
        text: {
            primary: grey["50"],
        },
        type: 'dark',
    }
});

ReactDOM.render(
    <MuiThemeProvider theme={darkTheme}>
        <React.Fragment>
            <CssBaseline />
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route path='/signIn' component={LoginScreen}/>
                        <Route path='/' exect={true} component={App}/>
                    </Switch>
                </Router>
            </Provider>
        </React.Fragment>
    </MuiThemeProvider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
