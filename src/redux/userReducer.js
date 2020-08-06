import {usersAPI} from '../api/api';
import {updateObjectInArray} from '../utils/helpers/objectHelper';

const FOLLOW = 'social-network/user/FOLLOW';
const UNFOLLOW = 'social-network/user/UNFOLLOW';
const SET_USERS = 'social-network/user/SET_USERS';
const SET_CURRENT_PAGE = 'social-network/user/SET_CURRENT_PAGE';
const SET_TOTAL_USER_COUNT = 'social-network/user/SET_TOTAL_USER_COUNT';
const TOGGLE_IS_FETCHING = 'social-network/user/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'social-network/user/TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
};

const userReducer = (state = initialState, action) => {
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

export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USER_COUNT, count: totalUsersCount});
export const followSuccses = (userId) => ({type: FOLLOW, userId});
export const unfollowSuccses = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFollowingInProgress = (followingInProgress, userId) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    followingInProgress,
    userId
});


export const getUsersThunkCreator = (page, pageSize) => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));
        let data = await usersAPI.getUsers(page, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
};
const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingInProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingInProgress(false, userId));
};

export const follow = (userId) => {
    return async (dispatch) => {
        await followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccses)
    };
};

export const unfollow = (userId) => {
    return async (dispatch) => {
        await followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccses)
    };
};

export default userReducer;
