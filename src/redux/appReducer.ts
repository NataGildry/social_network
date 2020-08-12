import {getAuthUserData} from './authReducer';
import {ThunkAction} from 'redux-thunk';
import {AppStateType} from './redux-store';

const SET_INITIALIZED = 'SET_INITIALIZED';

export type InitialStateType ={
    initialized: boolean
};

let initialState: InitialStateType = {
    initialized: false,
    //globalError: null
};

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
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

type ActionsType = InitializedSuccessActionType;
type InitializedSuccessActionType = {
    type: typeof SET_INITIALIZED
};
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;
export const initializedSuccess = ():ActionsType => ({type: SET_INITIALIZED});
// ----- initiolizeApp with PROMISE----
// export const initiolizeApp = () => (dispatch) => {
//     let promise = dispatch(getAuthUserData());
//     promise.then(() => {
//             dispatch(initializedSuccess());
//         }
//     );
// };
export const initiolizeApp = ():ThunkType => async (dispatch,
                                                    getState) => {
    await dispatch(getAuthUserData());
    dispatch(initializedSuccess());
};
export default appReducer;
