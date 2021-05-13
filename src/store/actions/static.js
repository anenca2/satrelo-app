/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import axios from 'axios';
import {
    ADD_STATIC_SELECTED_OPTION,
    RESET_STATIC_OPTIONS,
    SET_STATIC_OPTIONS,
    SET_STATIC_SELECTED_OPTIONS 
} from './types';

const apiURL = process.env.REACT_APP_API_URL;

/** Agregar una opción seleccionada (solo para multichoice) */
export const addStaticSelectedOption = (fieldData) => (dispatch) => {
    dispatch({
        type: ADD_STATIC_SELECTED_OPTION,
        payload: fieldData
    });
}

/** Obtener la información de las siguientes opciones */
export const getStaticOptions = (fieldData) => async (dispatch) => {
    const { fieldId } = fieldData;

    let url = null;
    if (fieldId === 'category')
        url = `${apiURL}/static/categories`

    else if (fieldId === 'subcategory') {
        const { categoryId } = fieldData.required;
        url = `${apiURL}/static/categories/${categoryId}/subcategories`;
    }

    else if (fieldId === 'sintactic')
        url = `${apiURL}/static/structures`;
        
    else if (fieldId === 'vocabulary' || fieldId === 'mechanic') {
        const { subcategoryId, sintacticId } = fieldData.required;
        const sid = subcategoryId;
        const stid = sintacticId;
        url = `${apiURL}/static/subcategories/${sid}/structures/${stid}`;

        if (fieldId === 'vocabulary')
            url = `${url}/vocabularies`;
        else
            url = `${url}/mechanics`;
    }
    
    if (url) {
        /** Realizar el request */
        try {
            const response = await axios.get(url);
            const { data: { data, message, status }} = response;

            const options = status === 200 ? data : null;
            const error = status !== 200;

            dispatch({
                type: SET_STATIC_OPTIONS,
                payload: { fieldId, options }
            });

            return { error, message };
        }
        catch (err) {
            return { error: true, message: err };
        }
    }
}

/** Resetear las opciones */
export const resetStaticOptions = (fieldData) => (dispatch) => {
    dispatch({ 
        type: RESET_STATIC_OPTIONS, 
        payload: fieldData 
    });
}

/** Marcar como opción seleccionada */
export const setStaticSelectedOptions = (optionData) => (dispatch) => {
    dispatch({ 
        type: SET_STATIC_SELECTED_OPTIONS, 
        payload: optionData 
    });
}