/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.1
 */

import {
    SET_PATIENT_TOKEN,
    SET_THERAPIST_TOKEN
} from '../actions/types';

import { PATIENT, THERAPIST } from '@data/roles';

const PATIENT_TOKEN = `${PATIENT}Token`;
const THERAPIST_TOKEN = `${THERAPIST}Token`;

let initialState = {
    [PATIENT_TOKEN]: localStorage.getItem(PATIENT_TOKEN) || null,
    [THERAPIST_TOKEN]: localStorage.getItem(THERAPIST_TOKEN) || null
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_PATIENT_TOKEN:
            return {
                ...state,
                [PATIENT_TOKEN]: action.payload.token
            };

        case SET_THERAPIST_TOKEN:
            return {
                ...state,
                [THERAPIST_TOKEN]: action.payload.token
            };

        default:
            return state;
    }
}

export default authReducer;