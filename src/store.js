import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { todosReducer } from './reducers/todosReducer.js';
import { filtersReducer } from './reducers/filtersReducer';

const reducer = combineReducers({
    todosState: todosReducer,
    filtersState: filtersReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
