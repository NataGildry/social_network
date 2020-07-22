import {getAuthUserData} from './authReducer';

const SET_INITIALIZED = 'SET_INITIALIZED';

let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true
            };
        default:
            return state;
    }
};

export const initializedSuccess = () => ({type: SET_INITIALIZED});
// ----- initiolizeApp with PROMISE----
// export const initiolizeApp = () => (dispatch) => {
//     let promise = dispatch(getAuthUserData());
//     promise.then(() => {
//             dispatch(initializedSuccess());
//         }
//     );
// };
export const initiolizeApp = () => async(dispatch) => {
   await dispatch(getAuthUserData());
            dispatch(initializedSuccess());
};
export default appReducer;
