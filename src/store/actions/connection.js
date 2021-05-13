/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import axios from 'axios';
import {
    SET_CHECK_SERVER_STATUS,
    SET_CONNECTED_ID, 
    SET_CONNECT_SOCKET 
} from './types';

const gameServerURL = process.env.REACT_APP_FILE_SERVER;
const serverURL = process.env.REACT_APP_SERVER_URL;

export const ping = (game = false) => async () => {
    const url = `${game ? gameServerURL : serverURL}/ping`;

    try {
        const response = await axios.get(url);
        const { data: { message, status }} = response;
        const error = status !== 200;
        
        return { error, message, status };
    }
    catch (err) {
        return { error: true, message: err, status: 500 };
    }
}

export const setCheckServerStatus = (check) => (dispatch) => {
    dispatch({ 
        type: SET_CHECK_SERVER_STATUS, 
        payload: { check }
    });
}

export const setConnectedId = (connectedId) => (dispatch) => {
    dispatch({ 
        type: SET_CONNECTED_ID, 
        payload: { connectedId }
    });
}

export const setConnectSocket = (connectSocket) => (dispatch) => {
    dispatch({ 
        type: SET_CONNECT_SOCKET, 
        payload: { connectSocket }
    });
}