/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import axios from 'axios';
import {
    SET_COLLECTIONS,
    SET_COLLECTABLE,
    SET_USER_SKINS_OWNED,
    SET_USER_SKIN_OWNED,
} from './types';

const apiURL = process.env.REACT_APP_API_URL;

export const getCollections = () => async (dispatch) => {
    const url = `${apiURL}/collection`;

    try {
        const response = await axios.get(url);
        const { data: { data, message, status }} = response;

        const collections = status === 200 ? data : null;
        const error = status !== 200;

        dispatch({ 
            type: SET_COLLECTIONS, 
            payload: { collections }
        });

        return { error, message };
    }
    catch (err) {
        return { error: true, message: err };
    }
}

export const getCollectable = (collectionId, collectableId) => async (dispatch) => {
    const url = `${apiURL}/collection/${collectionId}/collectable/${collectableId}`;

    try {
        const response = await axios.get(url);
        const { data: { data, message, status }} = response;

        const collectable = status === 200 ? data : null;
        const error = status !== 200;

        dispatch({ 
            type: SET_COLLECTABLE, 
            payload: { collectable }
        });
        
        return { data, error, message }; 
    }
    catch (err) {
        return { data: null, error: true, message: err };
    }
}

/** Función para verificar si un usuario tiene un aspecto o no */
export const getPatientSkin = (userId, skinData) => async (dispatch) => {
    const { skinId } = skinData;
    const url = `${apiURL}/patient/${userId}/skin/${skinId}`;

    try {
        const response = await axios.get(url);
        const { data: { message, status }} = response;
        const error = status !== 200;

        if (status === 200) {
            const { single } = skinData;
            dispatch({
                type: single ? SET_USER_SKIN_OWNED : SET_USER_SKINS_OWNED, 
                payload: { data: skinData } 
            });
        }
        
        return { error, message };
    }
    catch (err) {
        return { error: true, message: err };
    }
}

export const setCollections = (collections) => (dispatch) => {
    dispatch({ 
        type: SET_COLLECTIONS, 
        payload: { collections }
    });
}

export const setCollectable = (collectable) => (dispatch) => {
    dispatch({
        type: SET_COLLECTABLE,
        payload: { collectable }
    });
}

/** Función para asociar aspectos al usuario */
export const setPatientSkins = (userId, skinData) => async (dispatch) => {
    const url = `${apiURL}/patient/${userId}/skin`;
    const { skins } = skinData;

    try {
        const response = await axios.post(url, { skins });
        const { data: { message, status }} = response;
        const error = status !== 200;

        if (status === 200) {
            delete skinData.skins;
            /** Agregar aspecto desde la lista de coleccionables */
            if (skinData.single) {
                dispatch({
                    type: SET_USER_SKIN_OWNED, 
                    payload: { data: skinData }
                });
            }
            /** Agregar aspectos desde la lista de aspectos */
            else {
                skins.forEach(skin => {
                    skinData.skinId = skin.id;
                    dispatch({
                        type: SET_USER_SKINS_OWNED, 
                        payload: { data: skinData }
                    });
                });
            }
        }
        
        return { error, message };
    }
    catch (err) {
        return { error: true, message: err };       
    }
}