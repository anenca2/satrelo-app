/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import axios from 'axios';
import { 
    REMOVE_ACTIVITY,
    SET_ACTIVITIES,
    SET_ACTIVITY,
    SET_SELECTED_SESSION, 
    SET_SESSIONS,
    UPDATE_ACTIVITY,
} from './types';

const apiURL = process.env.REACT_APP_API_URL;

/** Crear una actividad */
export const createActivity = (configuration) => async () => {
    const url = `${apiURL}/assembler/`;

    try {
        const response = await axios.post(url, { configuration });
        const { data: { message, status }} = response;

        const error = status !== 200;
        return { error, message };
    }
    catch (err) {
        return { error: true, message: err };
    }
}

/** Crear la sesion de una actividad */
export const createActivitySession = (activityUserId) => async (dispatch) => {
    const url = `${apiURL}/session`;
    const sessionData = {
        date_start: new Date(),
        id_activity_user: activityUserId
    };

    try {
        const response = await axios.post(url, { session: sessionData });
        const { data: { data, message, status }} = response;
        const error = status !== 200;

        return { data, error, message };
    }
    catch (err) {
        return { error: true, message: err };
    }
}

/** Obtener la información de una actividad */
export const getActivity = (id) => async (dispatch) => {
    const url = `${apiURL}/activity/${id}`;

    try {
        const response = await axios.get(url);
        const { data: { data, message, status }} = response;
        
        const activity = status === 200 ? data : null;
        const error = status !== 200;

        dispatch({ 
            type: SET_ACTIVITY, 
            payload: { activity }
        });

        return { error, message };
    }
    catch (err) {
        return { error: true, message: err };
    }
}

/** Obtener actividades */
export const getActivities = (patientId) => async (dispatch) => {
    const url = `${apiURL}/patient/${patientId}/activities`;

    try {
        const response = await axios.get(url);
        const { data: { data, message, status }} = response;
        
        const activities = status === 200 ? data : null;
        const error = status !== 200;
        
        dispatch({ 
            type: SET_ACTIVITIES, 
            payload: { activities }
        });

        return { error, message };
    }
    catch (err) {
        return { error: true, message: err };
    }
}

/** Obtener las sesiones de la actividad de un usuario */
export const getSessions = (activityUserId) => async (dispatch) => {
    const url = `${apiURL}/activity/${activityUserId}/sessions`;

    try {
        const response = await axios.get(url);
        const { data: { data, message, status }} = response;

        const sessions = status === 200 ? data : null;
        const error = status !== 200;

        dispatch({ 
            type: SET_SESSIONS, 
            payload: { sessions }
        });

        return { error, message };
    }
    catch (err) {
        return { error: true, message: err };       
    }
}

export const removeActivity = (activityId) => async (dispatch) => {
    const url = `${apiURL}/activity/${activityId}`;

    try {
        const response = await axios.delete(url);
        const { data: { message, status }} = response;

        const error = status !== 200;
        if (!error) {
            dispatch({
                type: REMOVE_ACTIVITY,
                payload: { id: activityId }
            });
        }

        return { error, message };
    }
    catch (err) {
        return { error: true, message: err };
    }
}

export const setActivity = (activity) => (dispatch) => {
    dispatch({ 
        type: SET_ACTIVITY, 
        payload: { activity }
    });
}

export const setActivities = (activities) => (dispatch) => {
    dispatch({
        type: SET_ACTIVITIES,
        payload: { activities }
    });
}

export const setSession = (session) => (dispatch) => {
    dispatch({ 
        type: SET_SELECTED_SESSION, 
        payload: { session }
    });
}

export const setSessions = (sessions) => (dispatch) => {
    dispatch({ 
        type: SET_SESSIONS, 
        payload: { sessions }
    });
}

export const updateActivity = (activity) => async (dispatch) => {
    const url = `${apiURL}/activity/${activity.id}`;

    try {
        const response = await axios.put(url, { activity });
        const { data: { data, message, status }} = response;

        const error = status !== 200;
        if (!error) {
            dispatch({
                type: UPDATE_ACTIVITY,
                payload: { activity: data }
            });
        }

        return { error, message };
    }
    catch (err) {
        return { error: true, message: err };
    }
}

export const updateActivitySession = (session) => async (dispatch) => {
    const { id } = session;
    const url = `${apiURL}/session/${id}`;

    try {
        const response = await axios.put(url, { session });
        const { data: { message, status }} = response;
        const error = status !== 200;

        return { error, message };
    }
    catch (err) {
        return { error: true, message: err };
    }
}