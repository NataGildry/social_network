import {combineReducers, createStore} from 'redux';
import dialogReducer from './dialogReducer';
import profileReducer from './profileReducer';
import sidebarReducer from './sidebarReducer';
import userReducer from './userReducer';
import authReducer from './authReducer';

let reducers = combineReducers({
    auth: authReducer,
    profilePage: profileReducer,
    dialogsPage: dialogReducer,
    sidebar: sidebarReducer,
    usersPage: userReducer
});

let store = createStore(reducers);
window.store = store;

export default store;
