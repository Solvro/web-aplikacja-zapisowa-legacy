import { grey} from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import store from './store/store';

const darkTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#335599',
            light: '#FFF',
        },
        secondary: {
            main: grey["900"],
        },
        text: {
            secondary: '#AFAFAF',
        },
        type: 'light',
        background: {
            paper: '#FFF',
            default: '#FAFAFA'
        },
    }
});

ReactDOM.render(
    <MuiThemeProvider theme={darkTheme}>
        <React.Fragment>
            <CssBaseline />
            <Provider store={store}>
                <BrowserRouter>
                        <Route path='/' exect={true} component={App}/>
                </BrowserRouter>
            </Provider>
        </React.Fragment>
    </MuiThemeProvider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
