import {profileAPI, usersAPI} from '../api/api';
import {stopSubmit} from 'redux-form';

const ADD_POST = 'social-network/profile/ADD-POST';
const SET_USER_PROFILE = 'social-network/profile/SET_USER_PROFILE';
const SET_STATUS = 'social-network/profile/SET_STATUS';
const DELETE_POST = 'social-network/profile/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'social-network/profile/SAVE_PHOTO_SUCCESS';


let initialState = {
    posts: [
        {id: 1, message: 'Hi, it is me', likeCount: 5},
        {id: 2, message: 'It is my first post here', likeCount: 60},
        {id: 3, message: 'It is my second post here', likeCount: 200}
    ],
    profile: null,
    status: ''
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST :
            let newText = action.newPostText;
            return {
                ...state,
                posts: [...state.posts, {id: 4, message: newText}]
            };
        case SET_USER_PROFILE :
            return {
                ...state,
                profile: action.profile
            };
        case SET_STATUS :
            return {
                ...state,
                status: action.status
            };
        case DELETE_POST :
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            };
        case SAVE_PHOTO_SUCCESS :
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            };
        default:
            return state;
    }
};

export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos});
export const deletePost = (postId) => ({type: DELETE_POST, postId});
export const getUserProfile = (userId) => async (dispatch) => {
    let data = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(data));
};
export const setUserStatus = (status) => ({type: SET_STATUS, status});
export const getUserStatus = (status) => async (dispatch) => {
    let data = await profileAPI.getStatus(status);
    dispatch(setUserStatus(data));
};
export const updateUserStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status));
    }
};
export const savePhoto = (file) => async (dispatch) => {
    const response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
};
export const saveProfile = (profile) => async (dispatch, getState) => {
    //getState берётся из другого редьюсера (auth)
    const userId = getState().auth.id;
    const response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        //для вывода общей ошибки пишу _error
      dispatch(stopSubmit("editProfile", {_error: response.data.messages[0]}));
        //для вывода ошибки по полям контактов пишу"contacts":{"facebook" ...}
        //dispatch(stopSubmit("editProfile", {"contacts":{"facebook": response.data.messages[0]}}));
        return Promise.reject(response.data.messages[0]);
    }
};

export default profileReducer;
