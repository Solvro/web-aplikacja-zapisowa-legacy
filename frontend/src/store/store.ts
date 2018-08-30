import {rootReducer} from '.';

import {connectRouter, routerMiddleware} from 'connected-react-router'
import createHistory from 'history/createBrowserHistory'
import {applyMiddleware, compose, createStore} from 'redux';


export const history = createHistory();

const enhancers = [];
const middleware = [
    routerMiddleware(history)
];

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = (window as any).__REDUX_DEVTOOLS_EXTENSION__

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension())
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);

const store = createStore(
    connectRouter(history)(rootReducer),
    composedEnhancers
);

export default store;