/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import { 
    ADD_STATIC_SELECTED_OPTION,   
    RESET_STATIC_OPTIONS,
    SET_STATIC_OPTIONS,
    SET_STATIC_SELECTED_OPTIONS 
} from '../actions/types';

let initialState = {
    category: {
        id: 'category',
        first: true,
        next: 'subcategory',
        multichoice: false,
        options: null,
        reset: [ 'subcategory', 'sintactic', 'vocabulary', 'mechanic' ],
        subtitle: `Elige una categoría semántica para desbloquear la opción
                    Subcategoría semántica.`,
        title: '1. Categoría semántica',
    },
    subcategory: {
        id: 'subcategory',
        multichoice: false,
        next: 'sintactic',
        options: null,
        required: [ 'category' ],
        reset: [ 'sintactic', 'vocabulary', 'mechanic' ],
        subtitle: `Elige una de las subcategorías semánticas asociadas a la
                    categoría semántica elegida. Esta selección desbloquea la
                    opción Estructura sintáctica.`,
        title: '2. Subcategoría semántica',
    },
    sintactic: {
        id: 'sintactic',
        multichoice: false,
        next: 'vocabulary',
        options: null,
        reset: [ 'vocabulary', 'mechanic' ],
        subtitle: `Elige la estructura sintáctica que deseas trabajar con tu
                    paciente y desbloquea el vocabulario asociado.`,
        title: '3. Estructura sintáctica',
    },
    vocabulary: {
        id: 'vocabulary',
        minimum: 3,
        multichoice: true,
        next: 'mechanic',
        options: null,
        required: [ 'subcategory', 'sintactic' ],
        reset: [ 'mechanic' ],
        subtitle: `Elige las palabras asociadas que quieres trabajar con tu
                    paciente en la actividad (mínimo 3). Al elegir el vocabulario
                    se desbloquea la mecánica de la actividad.`,
        title: '4. Vocabulario asociado',
    },
    mechanic: {
        id: 'mechanic',
        multichoice: false,
        next: null,
        options: null,
        required: [ 'subcategory', 'sintactic' ],
        reset: null,
        subtitle: `Elige la mecánica de la actividad que deseas trabajar con
                    tu paciente.`,
        title: '5. Mecánica de la actividad',
    }
}

const staticReducer = (state = initialState, action) => {
    let field;
    let fieldId;
    let optionId;
    let options;

    switch(action.type) {
        case ADD_STATIC_SELECTED_OPTION:
            fieldId = action.payload.fieldId;
            field = state[fieldId];

            optionId = action.payload.optionId;
            options = { ...field.options };

            /** Marcar como seleccionada o no la opción elegida */
            let option = options[optionId];
            option.selected = option.selected ? !option.selected: true;

            return {
                ...state,
                [fieldId]: { ...field, options }
            };

        case RESET_STATIC_OPTIONS:
            fieldId = action.payload.fieldId;
            field = state[fieldId];

            return {
                ...state,
                [fieldId]: {
                    ...field,
                    options: null
                }
            };
        
        case SET_STATIC_OPTIONS:
            fieldId = action.payload.fieldId;
            field = state[fieldId];

            return {
                ...state,
                [fieldId]: {
                    ...field,
                    options: action.payload.options
                }
            };

        case SET_STATIC_SELECTED_OPTIONS:
            fieldId = action.payload.fieldId;
            optionId = action.payload.optionId;

            field = state[fieldId];
            options = Object.values({ ...field.options });
            /** Remover las selecciones */
            options.forEach(option => {
                option.selected = option.id === optionId ? true : false;
            });
            /** Convertir las opciones a un objeto */
            options = Object.assign({}, ...options.map((option) => {
                return { [option.id]: option };
            }));

            return {
                ...state,
                [field.id]: { ...field, options } 
            };

        default:
            return state;
    }
}

export default staticReducer;