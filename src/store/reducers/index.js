/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import { combineReducers } from 'redux';
/** Imports de los reducers */
import activityReducer from './activity';
import authReducer from './auth';
import avatarReducer from './avatar';
import collectionReducer from './collection';
import configurationReducer from './configuration';
import connectionReducer from './connection';
import dynamicReducer from './dynamic';
import feedbackReducer from './feedback';
import patientReducer from './patient';
import staticReducer from './static';
import uiReducer from './ui';
import userReducer from './user';

/** Combinar reducers */
const allReducers = combineReducers({
    activity: activityReducer,
    auth: authReducer,
    avatar: avatarReducer,
    collection: collectionReducer,
    configuration: configurationReducer,
    connection: connectionReducer,
    dynamic: dynamicReducer,
    feedback: feedbackReducer,
    patient: patientReducer,
    static: staticReducer,
    ui: uiReducer,
    user: userReducer
});

export default allReducers;