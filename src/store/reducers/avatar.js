/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import { 
    SET_AVATAR_MESSAGE,
    SET_AVATAR_VARIATION,
    SET_AVATAR_VARIATIONS 
} from '../actions/types';

let initialState = {
    message: null,
    variations: null,
}

const avatarReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AVATAR_MESSAGE:
            return {
                ...state,
                message: action.payload.message
            };

        case SET_AVATAR_VARIATION:
            const { variation } = action.payload;
            let variations  = Object.values(state.variations);
            /** Recorrer las variaciones */
            let index = 0;
            variations.forEach((v, i) => {
                if (variation.id === v.id && variation.id_avatar === v.id_avatar)
                    index = i;
            });
            /** Reemplazar la variación */
            variations[index] = variation;

            variations = Object.assign({}, ...variations.map(v => {
                return { [v.id]: v };
            }));

            return { ...state, variations };

        case SET_AVATAR_VARIATIONS:
            return {
                ...state,
                variations: action.payload.variations
            };

        default: 
            return state;
    }
}

export default avatarReducer;