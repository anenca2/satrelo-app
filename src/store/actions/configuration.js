/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import {
    RESET_CONFIGURATION,
    SET_CONFIGURATION
} from './types';

export const buildConfiguration = (fieldsData, patient) => (dispatch) => {
    const fields = fieldsData.fields;
    const keys = Object.keys(fields);

    let configuration = {};
    /** Construir la configuración con las opciones seleccionadas */
    keys.forEach(key => {
        const field = fields[key];
        let options = field.options;
        options = Object.values(options);

        options.forEach(option => {
            /** Verificar que la opción se haya seleccionado */
            if (option.selected) {
                /** Verificar si el field admite múltiples selecciones */
                if (field.multichoice) {
                    /** Verificar si el field ya existe en la configuración */
                    if (configuration[key])
                        /** Si ya existe entonces se anexa la opción */
                        configuration[key].push(option)
                    else
                        /** Si no existe entonces se crea un nuevo array
                         * teniendo como primer elemento la opción
                         */
                        configuration[key] = [option];
                }
                else
                    configuration[key] = option;
            }
        });
    });

    /** Anexar a la configuración la información del paciente */
    configuration.patient = patient;

    dispatch({ 
        type: SET_CONFIGURATION, 
        payload: { configuration }
    });
    
    return configuration;
}

export const resetConfiguration = () => (dispatch) => {
    dispatch({ 
        type: RESET_CONFIGURATION 
    });
}