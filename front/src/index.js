import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import AuthReducer from './store/Reducers/auth';
import thunk from 'redux-thunk';

const logger = store => {
    return next => {
        return action => {
            const result = next(action);
            return result;
        };
    };
};

const rootReducer = combineReducers({
    auth: AuthReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

      const store = createStore(rootReducer, composeEnhancers(
        applyMiddleware(logger, thunk)
      ));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));