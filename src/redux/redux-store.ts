import {Action, applyMiddleware, combineReducers, compose, createStore} from 'redux';
import dialogReducer from './dialogReducer';
import profileReducer from './profileReducer';
import sidebarReducer from './sidebarReducer';
import userReducer from './userReducer';
import authReducer from './authReducer';
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import appReducer from './appReducer';

let rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    profilePage: profileReducer,
    dialogsPage: dialogReducer,
    sidebar: sidebarReducer,
    usersPage: userReducer,
    form: formReducer
});
type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

// type PropertiesType<T> = T extends {[key :string] : infer U } ? U : never;
// export type InferActionTypes<T extends {[key :string] : (...args : any[]) => any}> = ReturnType<PropertiesType<T>>

export type InferActionTypes<T> =T extends {[key :string] : (...args : any[]) => infer U } ? U : never;
export type BaseThunkType<A extends Action, R = Promise<void> > = ThunkAction<R, AppStateType, unknown, A>;
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

//---without REDUX extension
//let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// @ts-ignore
window.___store___ = store;

export default store;
