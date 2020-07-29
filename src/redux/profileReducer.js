import {profileAPI, usersAPI} from '../api/api';

const ADD_POST = 'social-network/profile/ADD-POST';
const SET_USER_PROFILE = 'social-network/profile/SET_USER_PROFILE';
const SET_STATUS = 'social-network/profile/SET_STATUS';
const DELETE_POST = 'social-network/profile/DELETE_POST';

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
                posts: [...state.posts, {id: 5, message: newText}]
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

        default:
            return state;
    }
};

export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
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

export default profileReducer;
