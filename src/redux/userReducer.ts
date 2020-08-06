import {usersAPI} from '../api/api';
import {updateObjectInArray} from '../utils/helpers/objectHelper';
import {UserType} from '../types/types';

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

const userReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.followingInProgress
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
type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
};
type SetTotalUsersCountType = {
    type: typeof SET_TOTAL_USER_COUNT,
    count: number
};
type FollowSuccsesType = {
    type: typeof FOLLOW,
    userId: number
};
type UnfollowSuccsesType = {
    type: typeof UNFOLLOW,
    userId: number
};
type SetUsersType = {
    type: typeof SET_USERS,
    users: Array<UserType>
};
type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
};
type ToggleFollowingInProgressType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
    userId: number,
    isFetching:boolean
    //followingInProgress: Array<number>
};
export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountType => ({
    type: SET_TOTAL_USER_COUNT, count: totalUsersCount
});
export const followSuccses = (userId: number): FollowSuccsesType => ({type: FOLLOW, userId});
export const unfollowSuccses = (userId: number): UnfollowSuccsesType => ({type: UNFOLLOW, userId});
export const setUsers = (users: Array<UserType>): SetUsersType => ({type: SET_USERS, users});
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => ({type: TOGGLE_IS_FETCHING, isFetching});
// export const toggleFollowingInProgress = (followingInProgress: Array<number>, userId: number)
//     : ToggleFollowingInProgressType => ({
//     type: TOGGLE_IS_FOLLOWING_PROGRESS,
//     followingInProgress,
//     userId
// });
export const toggleFollowingInProgress = (isFetching: boolean, userId: number)
    : ToggleFollowingInProgressType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
});



export const getUsersThunkCreator = (page: number, pageSize: number) => {
    return async (dispatch: any) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));
        let data = await usersAPI.getUsers(page, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
};
const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleFollowingInProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingInProgress(false, userId));
};

export const follow = (userId: number) => {
    return async (dispatch: any) => {
        await followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccses)
    };
};

export const unfollow = (userId: number) => {
    return async (dispatch: any) => {
        await followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccses)
    };
};

export default userReducer;
