import {authAPI} from '../api/api';

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
    id: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_IS_FETCHING:
            return  {
                ...state,
                isFetching: action.isFetching
            };
        case SET_AUTH_USER_DATA:
            return  {
                ...state,
                ...action.data,
                isAuth: true
            };
        default:
            return state;
    }
};

export const setAuthUserData = (id, email, login) => ({type: SET_AUTH_USER_DATA, data: {id, email, login}});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const getAuthUserData = () => (dispatch) => {
    authAPI.getMyProfile()
        .then(data => {
            if (data.resultCode === 0) {
                let {id, email, login} = data.data;
                dispatch(setAuthUserData(id, email, login));
            }
        })
};

export default authReducer;
