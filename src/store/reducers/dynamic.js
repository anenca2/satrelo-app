/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import {
    RESET_DYNAMIC_OPTIONS,
    SET_DYNAMIC_OPTIONS,
    SET_DYNAMIC_SELECTED_OPTIONS
} from '../actions/types';

let initialState = {
    mechanic: {
        id: 'mechanic',
        first: true,
        multichoice: false,
        next: 'situations',
        options: null,
        reset: [ 'situations', 'times', 'reader' ], 
        subtitle: `Selecciona la mecánica de la actividad que deseas trabajar
                    con tu paciente. Esta selección desbloquea las situaciones
                    que se pueden trabajar en la actividad.`,
        title: '1. Mecánica de la actividad',
    },
    situations: {
        id: 'situations',
        multichoice: false,
        next: 'times',
        options: null,
        required: [ 'mechanic' ],
        reset: [ 'times', 'reader' ],
        subtitle: `Elige una situación particular para trabajar en la actividad.
                    Esta selección desbloquea los tiempos gramaticales.`,
        title: '2. Situaciones',
    },
    times: {
        id: 'times',
        multichoice: false,
        next: 'reader',
        options: null,
        reset: [ 'reader' ],
        subtitle: `Selecciona el tiempo gramatical (pasado, presente, futuro...)
                    que deseas trabajar en la actividad.`,
        title: '3. Tiempos gramaticales',
    },
    reader: {
        id: 'reader',
        multichoice: false,
        next: null,
        options: null,
        reset: null,
        subtitle: `Selecciona si tu paciente cuenta con proceso lector o no.`,
        title: '4. ¿El paciente cuenta con proceso lector?',
    }
}

const dynamicReducer = (state = initialState, action) => {
    let field;
    let fieldId;

    switch(action.type) {
        case RESET_DYNAMIC_OPTIONS:
            fieldId = action.payload.fieldId;
            field = state[fieldId];

            return {
                ...state,
                [fieldId]: {
                    ...field,
                    options: null
                }
            };

        case SET_DYNAMIC_OPTIONS:
            fieldId = action.payload.fieldId;
            field = state[fieldId];

            return {
                ...state,
                [fieldId]: {
                    ...field,
                    options: action.payload.options
                }
            };

        case SET_DYNAMIC_SELECTED_OPTIONS:
            fieldId = action.payload.fieldId;
            field = state[fieldId];

            /** Obtener la lista de opciones del field */
            let options = Object.values({ ...field.options });
            let optionId = action.payload.optionId;
            /** Marcar como seleccionada la opción elegida */
            options.forEach(option => {
                option.selected = option.id === optionId ? true : false;
            });

            return {
                ...state,
                [fieldId]: { ...field, options }
            };

        default:
            return state;
    }
}

export default dynamicReducer;