/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import {
    SET_CHECK_SERVER_STATUS,
    SET_CONNECTED_ID, 
    SET_CONNECT_SOCKET 
} from '../actions/types';

let initialState = {
    checkServerStatus: false,
    connectedId: null,
    connectSocket: false
};

const connectionReducer = (state = initialState, action) => {
    switch (action.type) {        
        case SET_CHECK_SERVER_STATUS:
            return {
                ...state,
                checkServerStatus: action.payload.check
            };

        case SET_CONNECTED_ID:
            return {
                ...state,
                connectedId: action.payload.connectedId
            };
            
        case SET_CONNECT_SOCKET:
            return {
                ...state,
                connectSocket: action.payload.connectSocket
            };
            
        default:
            return state;
    }
}

export default connectionReducer;