/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import { 
    SET_USER, 
    SET_USERS,
    SET_TO_UPDATE 
} from '../actions/types';

let initialState = {
    user: null,
    users: null,
    toUpdate: null,
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload.user
            };

        case SET_USERS:
            return {
                ...state,
                users: action.payload.users
            };

        case SET_TO_UPDATE:
            return {
                ...state,
                toUpdate: action.payload.user
            };
            
        default:
            return state;
    }
}

export default userReducer;