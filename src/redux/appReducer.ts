import {getAuthUserData} from './authReducer';
import {BaseThunkType, InferActionTypes} from './redux-store';
//const SET_INITIALIZED = 'social-network/app/SET_INITIALIZED';

export type InitialStateType ={
    initialized: boolean
};

let initialState: InitialStateType = {
    initialized: false,
    //globalError: null
};
type ActionsType = InferActionTypes<typeof actions>

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'social-network/app/SET_INITIALIZED':
            return {
                ...state,
                initialized: true
            };
        default:
            return state;
    }
};

export const actions = {
    initializedSuccess:() => ({type: 'social-network/app/SET_INITIALIZED'}) as const
};

// ----- initiolizeApp with PROMISE----
// export const initiolizeApp = () => (dispatch:any) => {
//     let promise = dispatch(getAuthUserData());
//     promise.then(() => {
//             dispatch(actions.initializedSuccess());
//         }
//     );
// };
// type ActionsType = InitializedSuccessActionType;
// type InitializedSuccessActionType = {
//     type: typeof SET_INITIALIZED
// };
//export const initializedSuccess = ():ActionsType => ({type: SET_INITIALIZED});
type ThunkType = BaseThunkType<ActionsType>;
export const initiolizeApp = ():ThunkType => async (dispatch,
                                                    getState) => {
    await dispatch(getAuthUserData());
    dispatch(actions.initializedSuccess());
};
export default appReducer;
