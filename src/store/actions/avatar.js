/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import axios from 'axios';

import { 
    SET_AVATAR_MESSAGE,
    SET_AVATAR_VARIATION,
    SET_AVATAR_VARIATIONS
} from './types';

const apiURL = process.env.REACT_APP_API_URL;

export const getAvatarVariation = (variationData) => async (dispatch) => {
    const url = `${apiURL}/avatar/variation`;

    try {
        const response = await axios.get(url, { params: { ...variationData }});
        const { data: { data, message, status }} = response;

        const variation = status === 200 ? data : null;
        const error = status !== 200;

        dispatch({ 
            type: SET_AVATAR_VARIATION, 
            payload: { variation }
        });

        return { data, error, message };
    }
    catch (err) {
        return { error: true, message: err };
    }
}

export const getAvatarVariations = (gender, userAvatar) => async (dispatch) => {
    const url = `${apiURL}/avatar/variations/${gender}`;

    try {
        const response = await axios.get(url);
        const { data: { data, status, message }} = response;
        
        let variations = status === 200 ? data : { 1: { id: 1, id_avatar: 1 }};
        const error = status !== 200;

        if (!error && userAvatar) {
            variations = Object.values(variations);
            /** Buscar y eliminar el avatar con el mismo id 
              * del avatar del usuario
              */
            let index = 0;
            variations.forEach((variation, i) => {
                if (userAvatar.id === variation.id)
                    index = i;
            });
            variations.splice(index, 1);
            /** Reemplazar el avatar del usuario
              * colocándolo en el primer lugar del arreglo  
              */
            variations.unshift(userAvatar);
            variations = Object.assign({}, ...variations.map(v => {
                return { [v.id]: v };
            }));
        }

        dispatch({ 
            type: SET_AVATAR_VARIATIONS, 
            payload: { variations }
        });

        return { error, message };
    }
    catch (err) {
        return { error: true, message: err };   
    }
}

export const setAvatarVariation = (variation) => (dispatch) => {
    dispatch({ 
        type: SET_AVATAR_VARIATION, 
        payload: { variation }
    });
}

export const setAvatarVariations = (variations) => (dispatch) => {
    dispatch({
        type: SET_AVATAR_VARIATIONS,
        payload: { variations }
    });
}

export const setMessage = (message) => (dispatch) => {
    dispatch({ 
        type: SET_AVATAR_MESSAGE, 
        payload: { message }
    });
}