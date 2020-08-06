import {authAPI, securityAPI} from '../api/api';
import {stopSubmit} from 'redux-form';

const SET_AUTH_USER_DATA = 'social-network/auth/SET_AUTH_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'social-network/auth/GET_CAPTCHA_URL_SUCCESS';
const TOGGLE_IS_FETCHING = 'social-network/auth/TOGGLE_IS_FETCHING';

let initialState = {
    id: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false,
    captchaUrl: null // if null that captcha is not required
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case SET_AUTH_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

export const setAuthUserData = (id, email, login, isAuth) => ({
    type: SET_AUTH_USER_DATA,
    payload: {id, email, login, isAuth}
});
export const getCaptchaUrlSuccess = (captchaUrl) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const getAuthUserData = () => async (dispatch) => {
    let data = await authAPI.getMyProfile();
    if (data.resultCode === 0) {
        let {id, email, login} = data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
};
export const login = (email, password, rememberMe) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe);
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }
        const message = response.data.messages.length > 0 ? response.data.messages[0] : "Email or password is not correct";
        dispatch(stopSubmit("login", {_error: message}));
    }
};
export const getCaptchaUrl = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
};
export const logout = () => async (dispatch) => {
    const response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
};
export default authReducer;
