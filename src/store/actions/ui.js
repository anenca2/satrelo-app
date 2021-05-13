/**
 * @author Martín Vladimir Alonso Sierra Galvis
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
    SHOW_MOBILE_MENU
} from './types';


export const setBar = (bar) => (dispatch) => {
    dispatch({
        type: SET_BAR,
        payload: { bar }
    });
}

export const setFullScreen = (fullScreen) => (dispatch) => {
    dispatch({ 
        type: SET_FULLSCREEN, 
        payload: { fullScreen }
    });
}

export const setModal = (modal) => (dispatch) => {
    dispatch({ 
        type: SET_MODAL, 
        payload: { modal }
    });
}

export const setNotification = (notification) => (dispatch) => {
    dispatch({ 
        type: SET_NOTIFICATION, 
        payload: { notification }
    });
}

export const setParallax = (parallax) => (dispatch) => {
    dispatch({
        type: SET_PARALLAX,
        payload: { parallax }
    });
}

export const setVOffset = (vOffset) => (dispatch) => {
    dispatch({ 
        type: SET_V_OFFSET, 
        payload: { vOffset }
    });
}

export const setWindowWidth = (width) => (dispatch) => {
    dispatch({ 
        type: SET_WINDOW_WIDTH, 
        payload: { width }
    });
}

export const showAvatar = (show) => (dispatch) => {
    dispatch({ 
        type: SHOW_AVATAR, 
        payload: { show }
    });
}

export const showCreateActivityButton = (show) => (dispatch) => {
    dispatch({ 
        type: SHOW_CREATE_ACTIVITY_BUTTON, 
        payload: { show }
    });
}

export const showMobileMenu = (show) => (dispatch) => {
    dispatch({ 
        type: SHOW_MOBILE_MENU, 
        payload: { show }
    });
}