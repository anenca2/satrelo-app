/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import axios from 'axios';
import { 
    SET_USER, 
    SET_USERS,
    SET_TO_UPDATE 
} from './types';

const apiURL = process.env.REACT_APP_API_URL;

export const getUser = (id, toUpdate = false) => async (dispatch) => {
    const url = `${apiURL}/user/${id}`;
    
    try {
        const response = await axios.get(url);
        const { data: { data, message, status }} = response;
        
        const user = status === 200 ? data : null;
        const error = status !== 200;
        
        dispatch({
            type: toUpdate ? SET_TO_UPDATE : SET_USER,
            payload: { user }
        });

        return { error, message, user };
    }
    catch (err) {
        return { error: true, message: err, user: null };
    }
}

export const getUsers = (query = null) => async (dispatch) => {
    let url = `${apiURL}/user`;
    if (query)
        url = `${url}?search=${query}`;
    
    try {
        const response = await axios.get(url);
        const { data: { data, message, status }} = response;
        
        const users = status === 200 ? data : null;
        const error = status !== 200;

        dispatch({ 
            type: SET_USERS, 
            payload: { users }
        });

        return { error, message };
    }
    catch (err) {
        return { error: true, message: err };
    }
}

export const recoverPassword = (email, role) => async () => {
    const url = `${apiURL}/user/recover/pwd`;

    try {
        const response = await axios.put(url, { email, role });
        const { data: { message, status }} = response;

        const error = status !== 200;
        return { error, message, status };
    }
    catch (err) {
        return { 
            error: true, 
            message: 'Hubo un error de conexión. Inténtalo más tarde...' 
        };
    }
}

export const updateUser = (user, userId) => async (dispatch) => {
    const url = `${apiURL}/user/${user.id}`;

    try {
        const response = await axios.put(url, { user });
        const { data: { data, message, status }} = response;
        const error = status !== 200;

        /** Actualizar en el store solamente si es el 
          * usuario logueado
          */
        if (!error && user.id === userId)
            dispatch({ 
                type: SET_USER, 
                payload: { user: data }
            });
        
        return { error, message };
    }
    catch (err) {
        return { error: true, message: err };
    }
}

export const setUser = (user) => (dispatch) => {
    dispatch({ 
        type: SET_USER, 
        payload: { user }
    });
}

export const setUsers = (users) => (dispatch) => {
    dispatch({
        type: SET_USERS,
        payload: { users }
    });
}

export const setToUpdate = (user) => (dispatch) => {
    dispatch({ 
        type: SET_TO_UPDATE, 
        payload: { user }
    });
}