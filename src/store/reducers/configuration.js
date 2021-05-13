/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import {
    RESET_CONFIGURATION,
    SET_CONFIGURATION
} from '../actions/types';

let initialState = {
    configuration: null
}

const configurationReducer = (state = initialState, action) => {
    switch(action.type) {
        case RESET_CONFIGURATION:
            return {
                ...state,
                configuration: null
            };
        
        case SET_CONFIGURATION:
            return {
                ...state,
                configuration: action.payload.configuration
            };
        
        default:
            return state;
    }
}

export default configurationReducer;