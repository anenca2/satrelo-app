/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import { 
    REMOVE_ACTIVITY,
    SET_ACTIVITIES,
    SET_ACTIVITY, 
    SET_SELECTED_SESSION,
    SET_SESSIONS,
    UPDATE_ACTIVITY,
} from '../actions/types';

let initialState = {
    activities: null,
    activity: null,
    sessions: null,
    session: null
};

const activityReducer = (state = initialState, action) => {
    switch(action.type) {
        case REMOVE_ACTIVITY:
            const activityId = action.payload.id;
            let activitiesForRemoval = state.activities;            
            delete activitiesForRemoval[activityId];

            /** Si el objto de actividades no tiene información, igualarlo a valor nulo */
            if (Object.values(activitiesForRemoval).length === 0) activitiesForRemoval = null;

            return { ...state, activities: activitiesForRemoval };

        case SET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload.activities
            };

        case SET_ACTIVITY:
            return {
                ...state,
                activity: action.payload.activity
            };
        
        case SET_SESSIONS:
            return {
                ...state,
                sessions: action.payload.sessions
            };
        
        case SET_SELECTED_SESSION: {
            return {
                ...state,
                session: action.payload.session
            };
        }

        case UPDATE_ACTIVITY:
            const updatedActivity = action.payload.activity;
            const id = updatedActivity.id;
            let activitiesForUpdate = state.activities;

            activitiesForUpdate[id] = updatedActivity;

            return { ...state, activities: activitiesForUpdate };

        default:
            return state;
    }
}

export default activityReducer;