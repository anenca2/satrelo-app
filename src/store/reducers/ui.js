/**
 * @author Martín Vladimir Alonsos Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import {
    SET_BAR,
    SET_FULLSCREEN,
    SET_MODAL,
    SET_NOTIFICATION,
    SET_PARALLAX,
    SET_V_OFFSET,
    SET_WINDOW_WIDTH,
    SHOW_AVATAR,
    SHOW_CREATE_ACTIVITY_BUTTON,
    SHOW_MOBILE_MENU,
} from '../actions/types';

let initialState = {
    bar: 'standard',
    fullScreen: false,
    modal: null,
    notification: null,
    parallax: false,
    showAvatar: false,
    showCreateActivityButton: false,
    showMobileMenu: false,
    vOffset: null,
    windowWidth: window.innerWidth
}

const uiReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_BAR:
            return {
                ...state,
                bar: action.payload.bar
            };
            
        case SET_FULLSCREEN:
            return {
                ...state,
                fullScreen: action.payload.fullScreen
            };

        case SET_MODAL:
            return {
                ...state,
                modal: action.payload.modal
            };
        
        case SET_NOTIFICATION:
            return {
                ...state,
                notification: action.payload.notification
            };

        case SET_PARALLAX:
            return {
                ...state,
                parallax: action.payload.parallax
            };

        case SET_V_OFFSET:
            return {
                ...state,
                vOffset: action.payload.vOffset
            };

        case SET_WINDOW_WIDTH:
            return {
                ...state,
                windowWidth: action.payload.width
            };

        case SHOW_AVATAR:
            return {
                ...state,
                showAvatar: action.payload.show
            }

        case SHOW_CREATE_ACTIVITY_BUTTON:
            return {
                ...state,
                showCreateActivityButton: action.payload.show
            };
        
        case SHOW_MOBILE_MENU:
            return {
                ...state,
                showMobileMenu: action.payload.show
            };

        default:
            return state;
    }
}

export default uiReducer;