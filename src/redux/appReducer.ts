import {getAuthUserData} from './authReducer';

const SET_INITIALIZED = 'SET_INITIALIZED';

export type InitialStateType ={
    initialized: boolean
};

let initialState: InitialStateType = {
    initialized: false,
    //globalError: null
};

const appReducer = (state = initialState, action: any): InitialStateType => {
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

type InitializedSuccessActionType = {
    type: typeof SET_INITIALIZED
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
export const initiolizeApp = () => async (dispatch: any) => {
    await dispatch(getAuthUserData());
    dispatch(initializedSuccess());
};
export default appReducer;
