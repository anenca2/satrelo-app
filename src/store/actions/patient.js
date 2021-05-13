/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import axios from 'axios';
import { 
    REMOVE_PATIENT,
    SET_PATIENT, 
    SET_PATIENTS, 
    SET_SELECTED_PATIENT
} from './types';

const apiURL = process.env.REACT_APP_API_URL;

/** Crear la asociación entre un terapeuta y un paciente */
export const createPatient = (therapistId, patientId) => async (dispatch) => {
    const url = `${apiURL}/therapist/${therapistId}/patient`;

    try {
        const response = await axios.post(url, { data: { pid: patientId }});
        const { data: { data, message, status }} = response;
        const error = status !== 200;

        if (status === 200) {
            const association = data[patientId];
            dispatch({ 
                type: SET_PATIENT,
                payload: { association }
            });
        }
        
        return { error, message };
    }
    catch (err) {
        return { error: true, message: err };
    }
}

/** Obtener la informaión de único paciente por medio de su id */
export const getPatient = (id) => async (dispatch) => {
    const url = `${apiURL}/user/${id}`;

    try {
        const response = await axios.get(url);
        const { data: { data, message, status}} = response;

        const patient = status === 200 ? data : null;
        const error = status !== 200;

        dispatch({ 
            type: SET_SELECTED_PATIENT, 
            payload: { patient }
        });

        return { error, message };
    }
    catch (err) {
        return { error: true, message: err };
    }
}

/** Obtener pacientes */
export const getPatients = (userId = null, query = null) => async (dispatch) => {
    let url = userId ? 
                /** Pacientes de un usuario terapeuta */
                `${apiURL}/therapist/${userId}/patient`
                :
                /** Todos los pacientes */
                `${apiURL}/patient`; 
    
    if (query)
        url = `${url}?search=${query}`;

    try {
        const response = await axios.get(url);
        const { data: { data, message, status }} = response;

        const patients = status === 200 ? data : null;
        const error = status !== 200;

        dispatch({ 
            type: SET_PATIENTS, 
            payload: { patients }
        });

        return { error, message };
    }
    catch (err) {
        return { error: true, message: err };
    }  
}

/** Remover la asociación entre un terapeuta y un paciente */
export const removePatient = (therapistId, patientId) => async (dispatch) => {
    const url = `${apiURL}/therapist/${therapistId}/patient/${patientId}`;

    try {
        const response = await axios.delete(url);
        const { data: { message, status }} = response;
        const error = status !== 200;

        if (status === 200) {
            const association = {
                _id_therapist: therapistId,
                _id_patient: patientId,
            }
            dispatch({ 
                type: REMOVE_PATIENT, 
                payload: { _association: association }
            });
        }
        
        return { error, message };
    }
    catch (err) {
        return { error: true, message: err };
    }
}

export const setPatient = (patient) => (dispatch) => {
    dispatch({ 
        type: SET_SELECTED_PATIENT, 
        payload: { patient }
    });
}

export const setPatients = (patients) => (dispatch) => {
    dispatch({
        type: SET_PATIENTS,
        payload: { patients }
    });
}