import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import App from './App';
import LoginScreen from "./components/LoginScreen";
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import store from './store/store';


ReactDOM.render(
    <Provider store={store}>
                <Router>
                    <Switch>
                        <Route path='/a' component={LoginScreen}/>
                        <Route path='/' exect={true} component={App}/>
                    </Switch>
                </Router>
            </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
