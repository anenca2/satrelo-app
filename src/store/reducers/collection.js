/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import { 
    SET_COLLECTIONS,
    SET_COLLECTABLE,
    SET_USER_SKIN_OWNED,
    SET_USER_SKINS_OWNED,
} from "../actions/types";

let initialState = {
    collections: null,
    collectable: null,
};

const collectionReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_COLLECTIONS:
            return {
                ...state,
                collections: action.payload.collections
            };

        
        case SET_COLLECTABLE:
            return {
                ...state,
                collectable: action.payload.collectable
            };


        case SET_USER_SKIN_OWNED:
            const data = action.payload.data;
            const collectableId = data.collectableId;
            const collectionId = data.collectionId;

            /** Navegar por el objeto usando los ids del data */
            const collections = state.collections;
            const collection = collections[collectionId];
            const Collectables = collection.Collectables;
            const collectable = Collectables[collectableId];
            const Skins = collectable.Skins;

            return {
                ...state,
                collections: {
                    ...collections,
                    [collectionId]: {
                        ...collection,
                        Collectables: {
                            ...Collectables,
                            [collectableId]: {
                                ...collectable,
                                Skins: {
                                    ...Skins,
                                    owned: true
                                }
                            }
                        }
                    }
                }
            };
        
        case SET_USER_SKINS_OWNED:
            const _data = action.payload.data;
            const _skinId = _data.skinId;

            /** Navegar por el objeto usando los ids del data */
            const _collectable = state.collectable;
            const _Skins = _collectable.Skins;
            const skin = _Skins[_skinId];

            return {
                ...state,
                collectable: {
                    ..._collectable,
                    Skins: {
                        ..._Skins,
                        [_skinId]: {
                            ...skin,
                            owned: true
                        }
                    }
                }
            };

        default:
            return state;
    }
}

export default collectionReducer;