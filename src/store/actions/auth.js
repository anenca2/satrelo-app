/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import axios from 'axios';
import {
    SET_PATIENT_TOKEN,
    SET_THERAPIST_TOKEN
} from './types';

import { PATIENT } from '@data/roles';

const apiURL = process.env.REACT_APP_API_URL;

export const login = (credentials, role) => async (dispatch) => {
    const url = `${apiURL}/auth/login`;
    credentials = { ...credentials, role };

    try {
        const response = await axios.post(url, { credentials });
        const { data: { data, message, status }, headers } = response;

        /** Obtener el token */
        const token = status === 200 ? headers['auth-token'] : null;
        const userId = status === 200 ? data.id : null;
        const error = status !== 200;

        dispatch({
            type: role === PATIENT ? SET_PATIENT_TOKEN : SET_THERAPIST_TOKEN,
            payload: { token }
        });
        localStorage.setItem(`${role}Token`, token);
            
        return { error, message, userId };
    }
    catch (err) {
        return { 
            error: true, 
            message: 'Hubo un error de conexión. Inténtalo más tarde...', 
            userId: null 
        };
    }
}

export const logout = (role) => (dispatch) => {
    dispatch({
        type: role === PATIENT ? SET_PATIENT_TOKEN : SET_THERAPIST_TOKEN,
        payload: { token: null }
    });
    localStorage.removeItem(`${role}Token`);
}

export const register = (user) => async () => {
    const url = `${apiURL}/auth/register`;

    try {
        const response = await axios.post(url, { user });
        const { data: { message, status }} = response;

        const error = status !== 200;
        return { error, message };
    }
    catch (err) {
        return { error: true, message: err };
    }
}