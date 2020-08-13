import {authAPI, ResultCodeEnum, ResultCodeForCaptureEnum, securityAPI} from '../api/api';
import {stopSubmit} from 'redux-form';
import {ThunkAction} from 'redux-thunk';
import {AppStateType} from './redux-store';


const SET_AUTH_USER_DATA = 'social-network/auth/SET_AUTH_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'social-network/auth/GET_CAPTCHA_URL_SUCCESS';
const TOGGLE_IS_FETCHING = 'social-network/auth/TOGGLE_IS_FETCHING';

// export type InitialStateType = {
//     id: number | null,
//     email: string | null,
//     login: string | null,
//     isFetching: boolean,
//     isAuth: boolean,
//     captchaUrl: string | null,
// };
let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isFetching: false,
    isAuth: false,
    captchaUrl: null as string | null// if null that captcha is not required
};
export type InitialStateType = typeof initialState;
const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        // case TOGGLE_IS_FETCHING:
        //     return {
        //         ...state,
        //         isFetching: action.isFetching
        //     };
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

type ActionsType = setAuthUserDataActionType| getCaptchaUrlSuccessActionType;
    type setAuthUserDataActionPayloadType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
};
type setAuthUserDataActionType = {
    type: typeof SET_AUTH_USER_DATA,
    payload: setAuthUserDataActionPayloadType
};
type getCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl: string }
};

export const setAuthUserData = (id: number | null,
                                email: string | null,
                                login: string | null,
                                isAuth: boolean): setAuthUserDataActionType => ({
    type: SET_AUTH_USER_DATA,
    payload: {id, email, login, isAuth}
});

export const getCaptchaUrlSuccess = (captchaUrl: string): getCaptchaUrlSuccessActionType => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
});
//export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const getAuthUserData = ():ThunkType  => async (dispatch,
                                                       getState) => {
    let data = await authAPI.getMyProfile();
    if (data.resultCode === ResultCodeEnum.Success) {
        let {id, email, login} = data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
};
export const login = (email: string, password: string, rememberMe: boolean) =>
    async (dispatch:any,
           getState:any) => {
        let loginData = await authAPI.login(email, password, rememberMe);
        if (loginData.resultCode === ResultCodeEnum.Success) {
                        await dispatch(getAuthUserData())
                    } else {
                        if (loginData.resultCode === ResultCodeForCaptureEnum.CaptureIsRequired) {
                            await dispatch(getCaptchaUrl());
                        }
                        const message = loginData.messages.length > 0 ? loginData.messages[0]
                            : "Email or password is not correct";
                        dispatch(stopSubmit("login", {_error: message}));
                    }
                };
export const getCaptchaUrl = ():ThunkType => async (dispatch,
                                                    getState) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
};
export const logout = (): ThunkType => async (dispatch, getState) => {
    const logoutData = await authAPI.logout();
    if (logoutData.resultCode === ResultCodeEnum.Success) {
        dispatch(setAuthUserData(null, null, null, false))
    }
};
export default authReducer;


