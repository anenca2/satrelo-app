/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import { 
    REMOVE_PATIENT,
    SET_PATIENT, 
    SET_PATIENTS, 
    SET_SELECTED_PATIENT
} from '../actions/types';

let initialState = {
    patients: null,
    patient: null,
};

const patientReducer = (state = initialState, action) => {
    switch(action.type) {
        case REMOVE_PATIENT:
            const { _association } = action.payload;
            /** Obtener los ids de la asociación */
            const { _id_therapist, _id_patient } = _association;
            const _patient = state.patients[_id_patient];

            /** Verificar que opción está teniendo lugar */
            if (_patient.Therapists_Patients) { /** my */
                let _patients = { ...state.patients };
                delete _patients[_id_patient];

                return { ...state, patients: _patients };
            }
            else { /** all */
                let _Therapists = { ..._patient.Therapists };
                delete _Therapists[_id_therapist];
                
                return {
                    ...state, patients: {
                        ...state.patients, [_id_patient]: {
                            ..._patient, 'Therapists': _Therapists
                        }
                    }
                };
            }

        
        case SET_PATIENT:
            const { association } = action.payload;
            const { id_therapist, id_patient } = association;
            const patient = state.patients[id_patient];
            const { Therapists } = patient;

            return {
                ...state, patients: {
                    ...state.patients, [id_patient]: {
                        ...patient, 'Therapists': {
                            ...Therapists, [id_therapist]: association
                        }
                    }
                }
            };

        
        case SET_PATIENTS:
            return {
                ...state,
                patients: action.payload.patients
            }

        case SET_SELECTED_PATIENT:
            return {
                ...state,
                patient: action.payload.patient
            };
        
        default:
            return state;
    }
}

export default patientReducer;