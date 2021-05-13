/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import axios from 'axios';
import { 
    SET_FEEDBACK_DATA,
    SET_FEEDBACK_DATE 
} from './types';

const apiURL = process.env.REACT_APP_API_URL;

/** Obtener niveles */
export const getLevels = (_data, historical = false) => async (dispatch) => {
    let url = apiURL;
    if (historical) {
        const { pid, startDate, endDate, mid } = _data;
        url = `${url}/feedback/historical/${pid}/${mid}/levels` +
                `?start=${startDate}&end=${endDate}`;
    }
    else {
        const { id } = _data;
        url = `${url}/feedback/${id}/levels`;
    }

    try {
        const response = await axios.get(url);
        const { data: { data, message, status }} = response;
        
        const feedData = status === 200 ? data : null;
        const error = status !== 200;
        
        dispatch({ 
            type: SET_FEEDBACK_DATA, 
            payload: { feedData }
        });

        return { error, message };
    }
    catch (err) {
        return { error: true, message: err };
    }
}

/** Obtener matches */
export const getMatches = (_data, historical = false) => async (dispatch) => {
    let url = apiURL;
    if (historical) { 
        const { pid, startDate, endDate, mid } = _data;
        url = `${url}/feedback/historical/${pid}/${mid}/matches` +
                `?start=${startDate}&end=${endDate}`;
    }
    else {
        const { id } = _data;
        url = `${url}/feedback/${id}/matches`;
    }

    try {
        const response = await axios.get(url);
        const { data: { data, message, status }} = response;

        const feedData = status === 200 ? data : null;
        const error = status !== 200;

        dispatch({ 
            type: SET_FEEDBACK_DATA, 
            payload: { feedData }
        });

        return { error, message };
    }
    catch (err) {
        return { error: true, message: err };
    }
}

/** Obtener phrases */
export const getPhrases = (_data, historical = false) => async (dispatch) => {
    let url = apiURL;    
    if (historical) {
        const { pid, startDate, endDate, mid } = _data;
        url = `${url}/feedback/historical/${pid}/${mid}/phrases` +
                `?start=${startDate}&end=${endDate}`;
    }
    else {
        const { id } = _data;
        url = `${url}/feedback/${id}/phrases`;
    }    

    try {
        const response = await axios.get(url);
        const { data: { data, message, status }} = response;

        const feedData = status === 200 ? data : null;
        const error = status !== 200;
        
        dispatch({ 
            type: SET_FEEDBACK_DATA, 
            payload: { feedData }
        });

        return { error, message };
    }
    catch (err) {
        return { error: true, message: err };
    }
}

export const getSecuences = (_data, historical = false) => async (dispatch) => {
    let url = apiURL;
    if (historical) {
        const { pid, startDate, endDate, mid } = _data;
        url = `${url}/feedback/historical/${pid}/${mid}/secuences` +
                `?start=${startDate}&end=${endDate}`;
    }
    else {
        const { id } = _data;
        url = `${url}/feedback/${id}/secuences`;
    }

    try {
        const response = await axios.get(url);
        const { data: { data, message, status }} = response;

        const feedData = status === 200 ? data : null;
        const error = status !== 200;

        dispatch({
            type: SET_FEEDBACK_DATA,
            payload: { feedData }
        });

        return { error, message };
    }
    catch (err) {
        return { error: true, message: err };
    }
}

/** Obtener sesiones para histórico de tiempos */
export const getSessions = (_data) => async (dispatch) => {
    const { pid, startDate, endDate, mid } = _data;
    const url = `${apiURL}/feedback/historical/${pid}/${mid}/sessions` +
                `?start=${startDate}&end=${endDate}`;

    try {
        const response = await axios.get(url);
        const { data: { data, message, status }} = response;
        
        const feedData = status === 200 ? data : null;
        const error = status !== 200;
        
        dispatch({ 
            type: SET_FEEDBACK_DATA, 
            payload: { feedData }
        });

        return { error, message };
    }
    catch (err) {
        return { error: true, message: err };        
    };
}

export const setFeedData = (feedData) => (dispatch) => {
    dispatch({ 
        type: SET_FEEDBACK_DATA, 
        payload: { feedData }
    });
}

export const setFeedDate = (feedDate) => (dispatch) => {
    dispatch({ 
        type: SET_FEEDBACK_DATE, 
        payload: { feedDate }
    });
}