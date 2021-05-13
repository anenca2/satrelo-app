/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import axios from 'axios';
import {
    RESET_DYNAMIC_OPTIONS,
    SET_DYNAMIC_OPTIONS,
    SET_DYNAMIC_SELECTED_OPTIONS,
} from './types';

const apiURL = process.env.REACT_APP_API_URL;

/** Obtener las opciones para un field en particular */
export const getDynamicOptions = (fieldData) => async (dispatch) => {
    const { fieldId } = fieldData;

    if (fieldId === 'mechanic' || fieldId === 'situations') {
        let url = `${apiURL}`;
        if (fieldId === 'mechanic') {
            url = `${url}/dynamic/mechanics`;
        }
        else {
            const { mechanicId } = fieldData.required;
            url = `${url}/dynamic/mechanics/${mechanicId}/situations`;
        }

        try {
            const response = await axios.get(url);
            const { data: { data, message, status }} = response;

            const options = status === 200 ? data : null;
            const error = status !== 200;

            dispatch({
                type: SET_DYNAMIC_OPTIONS,
                payload: { fieldId, options }
            });

            return { error, message };                            
        }
        catch (err) {
            return { error: true, message: err };
        }
    }
    else { 
        let options;
        if (fieldId === 'times') {
            options = {
                1: { id: 1, name: 'Presente' },
                /*2: { id: 2, name: 'Pasado' },
                3: { id: 3, name: 'Futuro' }*/
            };
        }
        else if (fieldId === 'reader') {
            options = {
                1: { id: 1, name: 'Si' },
                2: { id: 2, name: 'No' }
            };
        }

        dispatch({
            type: SET_DYNAMIC_OPTIONS,
            payload: { fieldId, options }
        });
    }
}

/** Resetear las opciones seleccionadas */
export const resetDynamicOptions = (fieldData) => (dispatch) => {
    dispatch({ 
        type: RESET_DYNAMIC_OPTIONS, 
        payload: fieldData 
    });
}

/** Setear las opciones seleccionadas */
export const setDynamicSelectedOptions = (fieldData) => (dispatch) => {
    dispatch({ 
        type: SET_DYNAMIC_SELECTED_OPTIONS, 
        payload: fieldData 
    });
}