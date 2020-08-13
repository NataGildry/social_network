import {usersAPI} from '../api/api';
import {updateObjectInArray} from '../utils/helpers/objectHelper';
import {UserType} from '../types/types';
import {AppStateType, InferActionTypes} from './redux-store';
import {Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';


const FOLLOW = 'social-network/user/FOLLOW';
const UNFOLLOW = 'social-network/user/UNFOLLOW';
const SET_USERS = 'social-network/user/SET_USERS';
const SET_CURRENT_PAGE = 'social-network/user/SET_CURRENT_PAGE';
const SET_TOTAL_USER_COUNT = 'social-network/user/SET_TOTAL_USER_COUNT';
const TOGGLE_IS_FETCHING = 'social-network/user/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'social-network/user/TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>// array of users id
};
type InitialStateType = typeof initialState;

const userReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            };
        case SET_TOTAL_USER_COUNT:
            return {
                ...state,
                totalUsersCount: action.count
            };
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id",
                    {followed: true})
                //maps method located in helpers
                // users: state.users.map(u => {
                //     if (u.id === action.userId) {
                //         return {...u, followed: true}
                //     }
                //     return u;
                // })
            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id",
                    {followed: false})
                //maps method located in helpers
                // users: state.users.map(u => {
                //     if (u.id === action.userId) {
                //         return {...u, followed: false}
                //     }
                //     return u;
                // })
            };
        case SET_USERS:
            return {
                ...state, users: action.users
            };
        default:
            return state;
    }
};
// ---------method with using concatenation
// action creators should look like this
//export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({type: SET_CURRENT_PAGE, currentPage});
//----------ActionsTypes
// type ActionsType = SetCurrentPageType | SetTotalUsersCountType | FollowSuccsesType |
//     UnfollowSuccsesType | SetUsersType | ToggleIsFetchingType | ToggleFollowingInProgressType;
//
// type SetCurrentPageType = {
//     type: typeof SET_CURRENT_PAGE,
//     currentPage: number
// };
// type SetTotalUsersCountType = {
//     type: typeof SET_TOTAL_USER_COUNT,
//     count: number
// };
// type FollowSuccsesType = {
//     type: typeof FOLLOW,
//     userId: number
// };
// type UnfollowSuccsesType = {
//     type: typeof UNFOLLOW,
//     userId: number
// };
// type SetUsersType = {
//     type: typeof SET_USERS,
//     users: Array<UserType>
// };
// type ToggleIsFetchingType = {
//     type: typeof TOGGLE_IS_FETCHING,
//     isFetching: boolean
// };
// type ToggleFollowingInProgressType = {
//     type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
//     userId: number,
//     isFetching:boolean
//     //followingInProgress: Array<number>
// };
export const actions = {
    setCurrentPage: (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({
        type: SET_TOTAL_USER_COUNT, count: totalUsersCount
    } as const),
    followSuccses: (userId: number) => ({type: FOLLOW, userId} as const),
    unfollowSuccses: (userId: number) => ({type: UNFOLLOW, userId} as const),
    setUsers: (users: Array<UserType>) => ({type: SET_USERS, users} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching} as const),
    toggleFollowingInProgress: (isFetching: boolean, userId: number) => ({
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        isFetching,
        userId
    } as const)
};
type ActionsType = InferActionTypes<typeof actions>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const getUsersThunkCreator = (page: number, pageSize: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(page));
        let data = await usersAPI.getUsers(page, pageSize);
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
    }
};
const _followUnfollowFlow = async (dispatch: Dispatch<ActionsType>,
                                   userId: number,
                                   apiMethod: any,
                                   actionCreator: (userId: number) => ActionsType) => {
    dispatch(actions.toggleFollowingInProgress(true, userId));
    let response = await apiMethod(userId);
    dispatch(actions.toggleFollowingInProgress(false, userId));
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
        return Promise.resolve('Followed / unfollowed')
    } else {
        return Promise.reject('Server error')
    }
};

export const follow = (userId: number): ThunkType => {
    return async (dispatch, getState) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccses)
    };
};

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch, getState) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccses)
    };
};

export default userReducer;
