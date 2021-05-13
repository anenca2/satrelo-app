/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import allReducers from './reducers';

const middleware = [ thunk ];

const composedEnhancers = composeWithDevTools(
    applyMiddleware(...middleware),
);

/** Crear el store de redux */
const store = createStore(
    allReducers,
    composedEnhancers,
);

export default store;