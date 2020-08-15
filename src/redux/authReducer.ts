import {ResultCodeEnum} from '../api/api';
import {FormAction, stopSubmit} from 'redux-form';
import {BaseThunkType, InferActionTypes} from './redux-store';
import {authAPI} from '../api/auth-api';
import {securityAPI} from '../api/security-api';

//const TOGGLE_IS_FETCHING = 'social-network/auth/TOGGLE_IS_FETCHING';

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

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        // case TOGGLE_IS_FETCHING:
        //     return {
        //         ...state,
        //         isFetching: action.isFetching
        //     };
        case 'social-network/auth/SET_AUTH_USER_DATA':
        case 'social-network/auth/GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

// type ActionsType = setAuthUserDataActionType| getCaptchaUrlSuccessActionType;
//     type setAuthUserDataActionPayloadType = {
//     id: number | null,
//     email: string | null,
//     login: string | null,
//     isAuth: boolean
// };
// type setAuthUserDataActionType = {
//     type: typeof SET_AUTH_USER_DATA,
//     payload: setAuthUserDataActionPayloadType
// };
// type getCaptchaUrlSuccessActionType = {
//     type: typeof GET_CAPTCHA_URL_SUCCESS,
//     payload: { captchaUrl: string }
// };

export const actions = {
    setAuthUserData: (id: number | null,
                      email: string | null,
                      login: string | null,
                      isAuth: boolean) => ({
        type: 'social-network/auth/SET_AUTH_USER_DATA',
        payload: {id, email, login, isAuth}
    }) as const,
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: 'social-network/auth/GET_CAPTCHA_URL_SUCCESS',
        payload: {captchaUrl}
    }) as const
};
// export const setAuthUserData = (id: number | null,
//                                 email: string | null,
//                                 login: string | null,
//                                 isAuth: boolean): setAuthUserDataActionType => ({
//     type: SET_AUTH_USER_DATA,
//     payload: {id, email, login, isAuth}
// });
//
// export const getCaptchaUrlSuccess = (captchaUrl: string): getCaptchaUrlSuccessActionType => ({
//     type: GET_CAPTCHA_URL_SUCCESS,
//     payload: {captchaUrl}
// });
//export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});

export const getAuthUserData = (): ThunkType => async (dispatch,
                                                       getState: any) => {
    let data = await authAPI.getMyProfile();
    if (data.resultCode === ResultCodeEnum.Success) {
        let {id, email, login} = data.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
};
export const login = (email: string, password: string, rememberMe: boolean): ThunkType =>
    async (dispatch,
           getState) => {
        let loginData = await authAPI.login(email, password, rememberMe);
        if (loginData.resultCode === ResultCodeEnum.Success) {
            await dispatch(getAuthUserData())
        } else {
            if (loginData.resultCode === ResultCodeEnum.CaptureIsRequired) {
                await dispatch(getCaptchaUrl());
            }
            const message = loginData.messages.length > 0 ? loginData.messages[0]
                : "Email or password is not correct";
            dispatch(stopSubmit("login", {_error: message}));
        }
    };
export const getCaptchaUrl = (): ThunkType => async (dispatch,
                                                     getState: any) => {
    const data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url;
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
};
export const logout = (): ThunkType => async (dispatch, getState) => {
    const logoutData = await authAPI.logout();
    if (logoutData.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
};
export default authReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionTypes<typeof actions>
//type ThunkType = BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>>;
type ThunkType = BaseThunkType<ActionsType | FormAction>;
