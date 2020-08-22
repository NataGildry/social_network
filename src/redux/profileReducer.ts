import {PhotosType, PostType, ProfileType} from '../types/types';
import {BaseThunkType, InferActionTypes} from './redux-store';
import {FormAction, stopSubmit} from 'redux-form';
import {usersAPI} from "../api/users -api";
import {profileAPI} from "../api/profile-api";

let initialState = {
    posts: [
        {id: 1, message: 'Hi, it is me', likeCount: 5},
        {id: 2, message: 'It is my first post here', likeCount: 60},
        {id: 3, message: 'It is my second post here', likeCount: 200}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: null as string | null,
    newPostText: ''
};

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'social-network/profile/ADD-POST' :
            let newText = action.newPostText;
            return {
                ...state,
                posts: [...state.posts, {id: state.posts.length + 1, message: newText}]
            }  as InitialStateType;
        case 'social-network/profile/SET_USER_PROFILE' :
            return {
                ...state,
                profile: action.profile
            };
        case 'social-network/profile/SET_STATUS' :
            return {
                ...state,
                status: action.status
            };
        case 'social-network/profile/DELETE_POST' :
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            };
        case 'social-network/profile/SAVE_PHOTO_SUCCESS' :
            if (state.profile) {
                return {
                    ...state,
                    profile: {...state.profile, photos: action.photos}
                }
            } else {
                return state
            }
        default:
            return state;
    }
};


export const actions = {
    addPostActionCreator: (newPostText: string) => ({type: 'social-network/profile/ADD-POST', newPostText}) as const,
    setUserProfile: (profile: ProfileType) => ({type: 'social-network/profile/SET_USER_PROFILE', profile}) as const,
    savePhotoSuccess: (photos: PhotosType) => ({type: 'social-network/profile/SAVE_PHOTO_SUCCESS', photos}) as const,
    deletePost: (postId: number) => ({type: 'social-network/profile/DELETE_POST', postId}) as const,
    setUserStatus:(status: string | null) => ({type: 'social-network/profile/SET_STATUS', status}) as const
};

export const getUserProfile = (userId:  number): ThunkType =>
    async (dispatch, getState) => {
    let data = await usersAPI.getProfile(userId);
    dispatch(actions.setUserProfile(data));
};
export const getUserStatus = (userId:  number): ThunkType =>
    async (dispatch,
           getState: any) => {
        let data = await profileAPI.getStatus(userId);
        dispatch(actions.setUserStatus(data));
    };
export const updateUserStatus = (status: string): ThunkType =>
    async (dispatch) => {
        let data = await profileAPI.updateStatus(status);
        if (data.resultCode === 0) {
            dispatch(actions.setUserStatus(status));
        }
    };
export const savePhoto = (file: File): ThunkType =>
    async (dispatch) => {
        const data = await profileAPI.savePhoto(file);
        if (data.resultCode === 0) {
            dispatch(actions.savePhotoSuccess(data.data.photos));
        }
    };
export const saveProfile = (profile: ProfileType): ThunkType =>
    async (dispatch,
           getState) => {
    //getState берётся из другого редьюсера (auth)
    const userId = getState().auth.id;
    const data = await profileAPI.saveProfile(profile);
    if (data.resultCode === 0) {
        if (userId != null) {
            await dispatch(getUserProfile(userId));
        } else {
            throw new Error("userId can't be null")
        }

    } else {
        //для вывода общей ошибки пишу _error
        dispatch(stopSubmit("editProfile", {_error: data.messages[0]}));
        //для вывода ошибки по каждому полю контактов пишу"contacts":{"facebook" ...}
        //dispatch(stopSubmit("editProfile", {"contacts":{"facebook": response.data.messages[0]}}));
        return Promise.reject(data.messages[0]);
    }
};

export default profileReducer;

type ActionsType = InferActionTypes<typeof actions>
export type InitialStateType = typeof initialState;
type ThunkType = BaseThunkType<ActionsType | FormAction>;
