/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import { 
    SET_FEEDBACK_DATA,
    SET_FEEDBACK_DATE 
} from '../actions/types';

let initialState = {
    feedDate: new Date(),
    feedData: null
};

const feedbackReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_FEEDBACK_DATA:
            return {
                ...state,
                feedData: action.payload.feedData
            };
        
        case SET_FEEDBACK_DATE:
            return {
                ...state,
                feedDate: action.payload.feedDate
            };
            
        default:
            return state;
    }
}

export default feedbackReducer;