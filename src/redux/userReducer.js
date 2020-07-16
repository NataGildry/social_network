import {usersAPI} from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USER_COUNT = 'SET_TOTAL_USER_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

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
            return  {
                ...state,
                isFetching: action.isFetching
            };
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return  {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [... state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            };
        case SET_CURRENT_PAGE:
            return  {
                ...state,
                currentPage: action.currentPage
            };
        case SET_TOTAL_USER_COUNT:
       return  {
           ...state,
           totalUsersCount: action.count
        };
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            };
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
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
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USER_COUNT, count:totalUsersCount});
export const followSuccses = (userId) => ({type: FOLLOW, userId});
export const unfollowSuccses = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFollowingInProgress = (followingInProgress, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, followingInProgress, userId});


export const getUsersThunkCreator = (currentPage, pageSize) => {
   return (dispatch) => {
        dispatch(toggleIsFetching(true));
        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
        })
    }
};

export const follow = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowingInProgress(true, userId));
        usersAPI.follow(userId)
            .then(response => {
                if (response.data.resultCode === 0) {
                  dispatch(followSuccses(userId))
                }
                dispatch(toggleFollowingInProgress(false, userId));
            });
    }
};

export const unfollow = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowingInProgress(true, userId));
        usersAPI.unfollow(userId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(unfollowSuccses(userId))
                }
                dispatch(toggleFollowingInProgress(false, userId));
            });
    }
};

export default userReducer;
